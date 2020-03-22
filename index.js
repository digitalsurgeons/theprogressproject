require('dotenv').config()

const express = require('express')
const chart = require('./lib/chart')
const mail = require('./lib/mail')
const template = require('./lib/template')

const app = express()
app.use(express.json())

app.use(express.static('public'))

app.post('/progress', (request, response) => {
  const answers = request.body.form_response.answers

  chart(answers, params => {
    mail(params, {
      to: process.env.EMAIL,
      template
    })
  })

  return
})

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: './templates'
  })
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`)
})
