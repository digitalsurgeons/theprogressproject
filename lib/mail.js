require('dotenv').config(***REMOVED*** path: '../.env' ***REMOVED***)

const mailgun = require('mailgun.js')

const s3Bucket = process.env.S3_BUCKET_URL

const mg = mailgun.client(***REMOVED***
  username: 'api',
  key: process.env.MAILGUN_API_KEY
***REMOVED***)

module.exports = (params, email) => ***REMOVED***
  mg.messages
    .create('impacteffort.digitalsurgeons.com', ***REMOVED***
      from: 'Impact vs Effort <noreply@impacteffort.digitalsurgeons.com>',
      to: [email.to, params.answers[2].text],
      subject: 'Your progress report from Digital Surgeons',
      html: email.template(params)
    ***REMOVED***)
    .then(msg => console.log(msg))
    .catch(err => console.log(err))

  return
***REMOVED***
