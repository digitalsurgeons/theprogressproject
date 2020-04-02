require('dotenv').config(***REMOVED*** path: '../.env' ***REMOVED***)

const ChartjsNode = require('chartjs-node')
const ChartDataLabels = require('chartjs-plugin-datalabels')
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
    layout: ***REMOVED***
      padding: ***REMOVED***
        top: 50
      ***REMOVED***
    ***REMOVED***,
    scales: ***REMOVED***
      yAxes: [
        ***REMOVED***
          scaleLabel: ***REMOVED***
            display: true,
            labelString: 'IMPACT',
            fontSize: 12,
            fontColor: 'black',
            fontStyle: 'bold'
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
            labelString: 'EFFORT',
            fontSize: 12,
            fontColor: 'black',
            fontStyle: 'bold'
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
    ***REMOVED***,
    plugins: ***REMOVED***
      datalabels: ***REMOVED***
        color: 'white',
        font: ***REMOVED***
          family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          weight: 'bold',
          size: 10
        ***REMOVED***,
        formatter: function(value, ctx) ***REMOVED***
          var letter = 'A'
          if (ctx.datasetIndex === 1) ***REMOVED***
            letter = 'B'
          ***REMOVED*** else if (ctx.datasetIndex === 2) ***REMOVED***
            letter = 'C'
          ***REMOVED*** else if (ctx.datasetIndex === 3) ***REMOVED***
            letter = 'D'
          ***REMOVED*** else if (ctx.datasetIndex === 4) ***REMOVED***
            letter = 'E'
          ***REMOVED***

          return letter
        ***REMOVED***
      ***REMOVED***,
      beforeDraw: function(chartInstance, easing) ***REMOVED***
        const ctx = chartInstance.chart.ctx
        const chartArea = chartInstance.chartArea

        ctx.fillStyle = 'white'
        ctx.fillRect(
          0,
          0,
          chartInstance.chart.width,
          chartInstance.chart.height
        )

        // draw y axis
        ctx.lineWidth = 2
        ctx.strokeStyle = '#000'
        ctx.setLineDash([])
        ctx.beginPath()
        ctx.moveTo(chartArea.left, chartArea.top)
        ctx.lineTo(chartArea.left, chartArea.bottom)
        ctx.stroke()

        // draw x axis
        ctx.beginPath()
        ctx.moveTo(chartArea.left, chartArea.bottom)
        ctx.lineTo(chartArea.right, chartArea.bottom)
        ctx.stroke()

        // draw dashed center line vertical
        ctx.globalAlpha = 0.5
        ctx.setLineDash([5, 8])
        ctx.lineWidth = 4
        ctx.strokeStyle = '#D6D5D6'
        ctx.beginPath()
        ctx.moveTo(chartArea.right / 2 + 16, chartArea.top + 2)
        ctx.lineTo(chartArea.right / 2 + 17, chartArea.bottom)
        ctx.stroke()

        // draw dashed center line horizontal
        ctx.beginPath()
        ctx.moveTo(chartArea.left + 2, chartArea.bottom / 2 + 23)
        ctx.lineTo(chartArea.right - 2, chartArea.bottom / 2 + 23)
        ctx.stroke()

        // draw sweet spot square
        ctx.fillStyle = '#b8e6f7'
        ctx.fillRect(
          chartArea.left + 7,
          chartArea.top,
          chartArea.right / 2 - 30,
          chartArea.right / 2 - 50
        )

        // draw sweet spot label
        ctx.globalAlpha = 1
        ctx.fillStyle = '#000000'
        ctx.font = '12px "Helvetica Neue", Helvetica, Arial, sans-serif'
        ctx.fillText('(Start here!)', chartArea.left + 90, chartArea.top - 13)
        ctx.font = 'bold 12px "Helvetica Neue", Helvetica, Arial, sans-serif'
        ctx.fillText(
          '"THE SWEET SPOT"',
          chartArea.left + 62,
          chartArea.top - 28
        )

        // draw x axis labels
        ctx.fillStyle = '#9F9D9D'
        ctx.font = 'bold 12px "Helvetica Neue", Helvetica, Arial, sans-serif'
        ctx.fillText('LOW', chartArea.left, chartArea.bottom + 25)
        ctx.fillText('HIGH', chartArea.right - 33, chartArea.bottom + 25)

        // draw y axis label
        ctx.save()
        ctx.rotate((-90 * Math.PI) / 180)
        ctx.fillText('HIGH', chartArea.left - 116, chartArea.top - 35)
        ctx.restore()
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

module.exports = (answers, cb) => ***REMOVED***
  if (!answers) ***REMOVED***
    return false
  ***REMOVED***

  const asset = `$***REMOVED***answers[2].text***REMOVED***-$***REMOVED***new Date().getTime()***REMOVED***.jpg`

  // store required tactics
  const tactics = [
    ***REMOVED***
      label: answers[7].text,
      effort: answers[8].number,
      impact: answers[9].number
    ***REMOVED***,
    ***REMOVED***
      label: answers[10].text,
      effort: answers[11].number,
      impact: answers[12].number
    ***REMOVED***
  ]

  // add optional tactics
  if (answers[15] && answers[15].number && answers[16].number) ***REMOVED***
    tactics.push(***REMOVED***
      label: answers[14].text,
      effort: answers[15].number,
      impact: answers[16].number
    ***REMOVED***)
  ***REMOVED***

  if (answers[19] && answers[19].number && answers[20].number) ***REMOVED***
    tactics.push(***REMOVED***
      label: answers[18].text,
      effort: answers[19].number,
      impact: answers[20].number
    ***REMOVED***)
  ***REMOVED***

  if (answers[23] && answers[23].number && answers[24].number) ***REMOVED***
    tactics.push(***REMOVED***
      label: answers[22].text,
      effort: answers[23].number,
      impact: answers[24].number
    ***REMOVED***)
  ***REMOVED***

  // reorder tactics based on high impact low effort
  tactics
    .sort((x, y) => ***REMOVED***
      return x.impact < y.impact
    ***REMOVED***)
    .sort((x, y) => ***REMOVED***
      return x.effort > y.effort
    ***REMOVED***)

  answers.tactics = tactics
  const datasets = []

  answers.tactics.forEach(tactic => ***REMOVED***
    datasets.push(***REMOVED***
      backgroundColor: '#EB4926',
      data: [
        ***REMOVED***
          y: tactic.impact || 0,
          x: tactic.effort || 0,
          r: 10
        ***REMOVED***
      ]
    ***REMOVED***)
  ***REMOVED***)

  chartOptions.data = ***REMOVED*** datasets ***REMOVED***

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

          return cb(***REMOVED*** answers, chart: `$***REMOVED***s3Bucket***REMOVED***/charts/$***REMOVED***asset***REMOVED***` ***REMOVED***)
        ***REMOVED***)
      ***REMOVED***)
    ***REMOVED***, 1000)
***REMOVED***
