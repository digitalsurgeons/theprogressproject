require('dotenv').config(***REMOVED*** path: '../.env' ***REMOVED***)

const ChartjsNode = require('chartjs-node')
const s3 = require('s3')
const path = require('path')

const s3Bucket = process.env.S3_BUCKET_URL
const s3Client = s3.createClient(***REMOVED***
  s3Options: ***REMOVED***
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  ***REMOVED***
***REMOVED***)

const chartNode = new ChartjsNode(560, 560)
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

module.exports = (answers, cb) => ***REMOVED***
  if (!answers) ***REMOVED***
    return false
  ***REMOVED***

  const asset = `$***REMOVED***answers[2]***REMOVED***-$***REMOVED***new Date().getTime()***REMOVED***.jpg`

  chartOptions.data = ***REMOVED***
    datasets: [
      ***REMOVED***
        backgroundColor: 'red',
        data: [
          ***REMOVED***
            x: answers[5].number || 0,
            y: answers[6].number || 0,
            r: 10
          ***REMOVED***
        ]
      ***REMOVED***,
      ***REMOVED***
        backgroundColor: 'blue',
        data: [
          ***REMOVED***
            x: answers[8].number || 0,
            y: answers[9].number || 0,
            r: 10
          ***REMOVED***
        ]
      ***REMOVED***,
      ***REMOVED***
        backgroundColor: 'green',
        data: [
          ***REMOVED***
            x: answers[11].number || 0,
            y: answers[12].number || 0,
            r: 10
          ***REMOVED***
        ]
      ***REMOVED***,
      ***REMOVED***
        backgroundColor: 'orange',
        data: [
          ***REMOVED***
            x: answers[14].number || 0,
            y: answers[15].number || 0,
            r: 10
          ***REMOVED***
        ]
      ***REMOVED***,
      ***REMOVED***
        backgroundColor: 'pink',
        data: [
          ***REMOVED***
            x: answers[17].number || 0,
            y: answers[18].number || 0,
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

          cb(***REMOVED*** answers, chart: `$***REMOVED***s3Bucket***REMOVED***/charts/$***REMOVED***asset***REMOVED***` ***REMOVED***)
        ***REMOVED***)
      ***REMOVED***)
    ***REMOVED***, 1000)
***REMOVED***
