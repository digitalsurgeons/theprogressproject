require('dotenv').config()

const express = require('express')
const crypto = require('crypto')
const chart = require('./lib/chart')
const mail = require('./lib/mail')
const template = require('./lib/template')
const db = require('./lib/db')

const app = express()

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    },
  })
)
app.use(express.static('public'))

app.post('/progress', async (req, res) => {
  const expectedSig = req.header('Typeform-Signature')

  const hash = crypto
    .createHmac('sha256', process.env.TYPEFORM_SECRET)
    .update(req.rawBody)
    .digest('base64')

  const actualSig = `sha256=${hash}`

  if (actualSig !== expectedSig) {
    res.status(403).send('invalid')
    return
  }

  const answers = req.body.form_response.answers

  await db.store(answers)
  const chartAsset = await chart(answers)
  await mail(
    { answers, chart: chartAsset },
    {
      bcc: process.env.EMAIL,
      template,
    }
  )

  res.send('ok')
})

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: './templates',
  })
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`)
})
