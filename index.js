require('dotenv').config()

const crypto = require('crypto')
const express = require('express')
const chart = require('./lib/chart')
const mail = require('./lib/mail')
const template = require('./lib/template')

const app = express()

app.use(
  express.json(***REMOVED***
    verify: (req, res, buf) => ***REMOVED***
      req.rawBody = buf
    ***REMOVED***,
  ***REMOVED***)
)
app.use(express.static('public'))

app.post('/progress', (req, res) => ***REMOVED***
  const expectedSig = req.header('Typeform-Signature')

  const hash = crypto
    .createHmac('sha256', process.env.TYPEFORM_SECRET)
    .update(req.rawBody)
    .digest('base64')

  const actualSig = `sha256=$***REMOVED***hash***REMOVED***`

  if (actualSig !== expectedSig) ***REMOVED***
    res.status(403).send('invalid')
    return
  ***REMOVED***

  const answers = req.body.form_response.answers

  chart(answers, (params) => ***REMOVED***
    mail(params, ***REMOVED***
      bcc: process.env.EMAIL,
      template,
    ***REMOVED***)
  ***REMOVED***)

  res.send('ok')
***REMOVED***)

app.get('/', (req, res) => ***REMOVED***
  res.sendFile('index.html', ***REMOVED***
    root: './templates',
  ***REMOVED***)
***REMOVED***)

app.listen(3000, () => ***REMOVED***
  console.log(`Example app listening on port 3000!`)
***REMOVED***)
