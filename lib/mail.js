require('dotenv').config(***REMOVED*** path: '../.env' ***REMOVED***)

const mailgun = require('mailgun.js')

const s3Bucket = process.env.S3_BUCKET_URL

const mg = mailgun.client(***REMOVED***
  username: 'api',
  key: process.env.MAILGUN_API_KEY
***REMOVED***)

module.exports = params => ***REMOVED***
  mg.messages
    .create('impacteffort.digitalsurgeons.com', ***REMOVED***
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
        <img src="$***REMOVED***s3Bucket***REMOVED***/charts/$***REMOVED***params.asset***REMOVED***" />
        <ul>
          <li>$***REMOVED***params.answers[0].text***REMOVED***</li>
          <li>$***REMOVED***params.answers[3].text***REMOVED***</li>
          <li>$***REMOVED***params.answers[6].text***REMOVED***</li>
          <li>$***REMOVED***params.answers[9].text***REMOVED***</li>
          <li>$***REMOVED***params.answers[12].text***REMOVED***</li>
        </ul>
      `
    ***REMOVED***)
    .then(msg => console.log(msg))
    .catch(err => console.log(err))
***REMOVED***
