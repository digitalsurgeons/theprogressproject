require('dotenv').config(***REMOVED*** path: '../.env' ***REMOVED***)

const mailgun = require('mailgun.js')

const s3Bucket = process.env.S3_BUCKET_URL

const mg = mailgun.client(***REMOVED***
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
***REMOVED***)

module.exports = (params, email) => ***REMOVED***
  mg.messages
    .create('impacteffort.digitalsurgeons.com', ***REMOVED***
      from: 'The Progress Project <noreply@impacteffort.digitalsurgeons.com>',
      to: params.answers[2].email,
      bcc: email.bcc,
      subject:
        'Your Personalized Progress Plan from Digital Surgeons is Ready!',
      html: email.template(params),
    ***REMOVED***)
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err))

  return
***REMOVED***
