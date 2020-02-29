require('dotenv').config()

const express = require('express')
const chart = require('./lib/chart')
const mail = require('./lib/mail')

const app = express()
app.use(express.json())

app.post('/', (request, response) => {
  console.log('\nNew response')
  console.log(request.body.form_response.answers)
  chart(request.body.form_response.answers, mail)
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`)
})
