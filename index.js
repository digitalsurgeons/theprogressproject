require('dotenv').config()

const express = require('express')
const chart = require('./lib/chart')
const mail = require('./lib/mail')
const template = require('./lib/template')

const app = express()
app.use(express.json())

app.use(express.static('public'))

app.post('/progress', (request, response) => ***REMOVED***
  const answers = request.body.form_response.answers

  chart(answers, params => ***REMOVED***
    mail(params, ***REMOVED***
      to: process.env.EMAIL,
      template
    ***REMOVED***)
  ***REMOVED***)

  return
***REMOVED***)

app.get('/', (req, res) => ***REMOVED***
  res.sendFile('index.html', ***REMOVED***
    root: './templates'
  ***REMOVED***)
***REMOVED***)

app.listen(3000, () => ***REMOVED***
  console.log(`Example app listening on port 3000!`)
***REMOVED***)
