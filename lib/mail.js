require('dotenv').config({ path: '../.env' })

const mailgun = require('mailgun.js')

const s3Bucket = process.env.S3_BUCKET_URL

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY
})

module.exports = params => {
  mg.messages
    .create('impacteffort.digitalsurgeons.com', {
      from: 'Impact vs Effort <noreply@impacteffort.digitalsurgeons.com>',
      to: ['ac@digitalsurgeons.com'],
      subject: 'Impact vs Effort - Start making an impact today',
      html: `
        <h1>Impact vs Effort</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Aenean ultrices sollicitudin lectus a consectetur. 
        Aenean tempus fringilla urna non mattis. 
        Nullam sed accumsan turpis. Donec nec magna aliquet, 
        viverra mi vitae, semper libero. Duis vitae lectus quam. 
        Suspendisse ac elementum orci.</p>
        <h2>Your Impact vs Effort Chart</h2>
        <img src="${s3Bucket}/charts/${params.asset}" />
        <ul>
          <li>${params.answers[0].text}</li>
          <li>${params.answers[3].text}</li>
          <li>${params.answers[6].text}</li>
          <li>${params.answers[9].text}</li>
          <li>${params.answers[12].text}</li>
        </ul>
      `
    })
    .then(msg => console.log(msg))
    .catch(err => console.log(err))
}
