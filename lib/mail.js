require('dotenv').config({ path: '../.env' })

const mailgun = require('mailgun.js')

const s3Bucket = process.env.S3_BUCKET_URL

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
})

module.exports = (params, email) => {
  mg.messages
    .create('impacteffort.digitalsurgeons.com', {
      from: 'The Progress Project <noreply@impacteffort.digitalsurgeons.com>',
      to: params.answers[2].email,
      bcc: email.bcc,
      subject:
        'Your Personalized Progress Plan from Digital Surgeons is Ready!',
      html: email.template(params),
    })
    .then((msg) => {
      console.log(msg)
      return
    })
    .catch((err) => {
      console.log(err)
      return
    })
}
