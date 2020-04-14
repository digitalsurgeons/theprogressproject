require('dotenv').config()

const crypto = require('crypto')
const express = require('express')
const chart = require('./lib/chart')
const mail = require('./lib/mail')
const template = require('./lib/template')

const app = express()

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    },
  })
)
app.use(express.static('public'))

app.post('/progress', (req, res) => {
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

  chart(answers, (params) => {
    mail(params, {
      bcc: process.env.EMAIL,
      template,
    })
  })

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
