require('dotenv').config()

const express = require('express')
const ChartjsNode = require('chartjs-node')
const s3 = require('s3')
const path = require('path')
const mailgun = require('mailgun.js')

const app = express()
app.use(express.json())

const s3Bucket = process.env.S3_BUCKET_URL
const s3Client = s3.createClient(***REMOVED***
  s3Options: ***REMOVED***
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  ***REMOVED***
***REMOVED***)

const mg = mailgun.client(***REMOVED***
  username: 'api',
  key: process.env.MAILGUN_API_KEY
***REMOVED***)

const chartNode = new ChartjsNode(600, 600)
const chartOptions = ***REMOVED***
  type: 'bubble',
  options: ***REMOVED***
    tooltips: ***REMOVED***
      enabled: false
    ***REMOVED***,
    legend: ***REMOVED***
      display: false
    ***REMOVED***,
    maintainAspectRatio: false,
    scales: ***REMOVED***
      yAxes: [
        ***REMOVED***
          scaleLabel: ***REMOVED***
            display: true,
            labelString: 'impact',
            fontFamily: 'Menlo',
            fontSize: 16,
            fontColor: 'black'
          ***REMOVED***,
          gridLines: ***REMOVED***
            display: false
          ***REMOVED***,
          ticks: ***REMOVED***
            display: false,
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 11
          ***REMOVED***
        ***REMOVED***
      ],
      xAxes: [
        ***REMOVED***
          scaleLabel: ***REMOVED***
            display: true,
            labelString: 'effort',
            fontFamily: 'Menlo',
            fontSize: 16,
            fontColor: 'black'
          ***REMOVED***,
          gridLines: ***REMOVED***
            display: false
          ***REMOVED***,
          ticks: ***REMOVED***
            display: false,
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 11
          ***REMOVED***
        ***REMOVED***
      ]
    ***REMOVED***
  ***REMOVED***,
  plugins: ***REMOVED***
    beforeDraw: function(chartInstance, easing) ***REMOVED***
      var ctx = chartInstance.chart.ctx

      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height)

      ctx.fillStyle = '#eee'
      ctx.fillRect(
        chartInstance.chartArea.left,
        chartInstance.chartArea.top,
        chartInstance.chartArea.right - chartInstance.chartArea.left,
        chartInstance.chartArea.bottom - chartInstance.chartArea.top
      )
    ***REMOVED***
  ***REMOVED***
***REMOVED***

app.post('/', (request, response) => ***REMOVED***
  console.log('\nNew response')
  console.log(request.body.form_response.answers)
  drawChart(request.body.form_response.answers)
***REMOVED***)

app.listen(3000, () => ***REMOVED***
  console.log(`Example app listening on port 3000!`)
***REMOVED***)

function drawChart(answers) ***REMOVED***
  if (!answers) ***REMOVED***
    return false
  ***REMOVED***

  const asset = `$***REMOVED***new Date().getTime()***REMOVED***.jpg`

  chartOptions.data = ***REMOVED***
    datasets: [
      ***REMOVED***
        backgroundColor: 'red',
        data: [
          ***REMOVED***
            x: answers[1].number || 0,
            y: answers[2].number || 0,
            r: 10
          ***REMOVED***
        ]
      ***REMOVED***,
      ***REMOVED***
        backgroundColor: 'blue',
        data: [
          ***REMOVED***
            x: answers[4].number || 0,
            y: answers[5].number || 0,
            r: 10
          ***REMOVED***
        ]
      ***REMOVED***,
      ***REMOVED***
        backgroundColor: 'green',
        data: [
          ***REMOVED***
            x: answers[7].number || 0,
            y: answers[8].number || 0,
            r: 10
          ***REMOVED***
        ]
      ***REMOVED***,
      ***REMOVED***
        backgroundColor: 'orange',
        data: [
          ***REMOVED***
            x: answers[10].number || 0,
            y: answers[11].number || 0,
            r: 10
          ***REMOVED***
        ]
      ***REMOVED***,
      ***REMOVED***
        backgroundColor: 'pink',
        data: [
          ***REMOVED***
            x: answers[13].number || 0,
            y: answers[14].number || 0,
            r: 10
          ***REMOVED***
        ]
      ***REMOVED***
    ]
  ***REMOVED***

  return chartNode
    .drawChart(chartOptions)
    .then(() => ***REMOVED***
      return chartNode.getImageBuffer('image/jpg')
    ***REMOVED***)
    .then(buffer => ***REMOVED***
      return chartNode.getImageStream('image/jpg')
    ***REMOVED***)
    .then(streamResult => ***REMOVED***
      return chartNode.writeImageToFile('image/jpg', `img/$***REMOVED***asset***REMOVED***`)
    ***REMOVED***)
    .then(() => ***REMOVED***
      setTimeout(() => ***REMOVED***
        const uploader = s3Client.uploadFile(***REMOVED***
          localFile: `img/$***REMOVED***asset***REMOVED***`,
          s3Params: ***REMOVED***
            Bucket: 'impacteffort',
            Key: `charts/$***REMOVED***asset***REMOVED***`
          ***REMOVED***
        ***REMOVED***)

        uploader.on('error', function(err) ***REMOVED***
          console.error('unable to upload:', err.stack)
        ***REMOVED***)

        uploader.on('progress', function() ***REMOVED***
          console.log(
            'progress',
            uploader.progressAmount,
            uploader.progressTotal
          )
        ***REMOVED***)

        uploader.on('end', function() ***REMOVED***
          console.log('Image saved ✅')
          console.log('Sending email...')

          mg.messages
            .create('impacteffort.digitalsurgeons.com', ***REMOVED***
              from:
                'Impact vs Effort <noreply@impacteffort.digitalsurgeons.com>',
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
                <img src="$***REMOVED***s3Bucket***REMOVED***/charts/$***REMOVED***asset***REMOVED***" />
                <ul>
                  <li>$***REMOVED***answers[0].text***REMOVED***</li>
                  <li>$***REMOVED***answers[3].text***REMOVED***</li>
                  <li>$***REMOVED***answers[6].text***REMOVED***</li>
                  <li>$***REMOVED***answers[9].text***REMOVED***</li>
                  <li>$***REMOVED***answers[12].text***REMOVED***</li>
                </ul>
              `
            ***REMOVED***)
            .then(msg => console.log(msg))
            .catch(err => console.log(err))
        ***REMOVED***)
      ***REMOVED***)
    ***REMOVED***, 1000)
***REMOVED***

const arrayFromObject = content => ***REMOVED***
  const val = []
  for (const key in content) ***REMOVED***
    val.push(***REMOVED*** name: key, content: content[key] ***REMOVED***)
  ***REMOVED***
  return val
***REMOVED***
