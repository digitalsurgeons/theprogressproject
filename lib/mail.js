require('dotenv').config({ path: '../.env' })

const mailgun = require('mailgun.js')

const s3Bucket = process.env.S3_BUCKET_URL

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY
})

module.exports = (params, email) => {
  mg.messages
    .create('impacteffort.digitalsurgeons.com', {
      from: 'Impact vs Effort <noreply@impacteffort.digitalsurgeons.com>',
      to: [email.to],
      subject: 'Impact vs Effort - Start making an impact today',
      html: email.template(params)
    })
    .then(msg => console.log(msg))
    .catch(err => console.log(err))
}
