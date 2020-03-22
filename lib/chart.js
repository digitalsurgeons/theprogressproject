require('dotenv').config({ path: '../.env' })

const ChartjsNode = require('chartjs-node')
const ChartDataLabels = require('chartjs-plugin-datalabels')
const s3 = require('s3')
const path = require('path')

const s3Bucket = process.env.S3_BUCKET_URL
const s3Client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
})

const chartNode = new ChartjsNode(560, 560)
const chartOptions = {
  type: 'bubble',
  options: {
    tooltips: {
      enabled: false
    },
    legend: {
      display: false
    },
    devicePixelRatio: 5,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 50
      }
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'IMPACT',
            fontSize: 12,
            fontColor: 'black',
            fontStyle: 'bold'
          },
          gridLines: {
            display: false
          },
          ticks: {
            display: false,
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 11
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'EFFORT',
            fontSize: 12,
            fontColor: 'black',
            fontStyle: 'bold'
          },
          gridLines: {
            display: false
          },
          ticks: {
            display: false,
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 11
          }
        }
      ]
    },
    plugins: {
      datalabels: {
        color: 'white',
        font: {
          family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          weight: 'bold',
          size: 10
        },
        formatter: function(value, ctx) {
          var letter = 'A'
          if (ctx.datasetIndex === 1) {
            letter = 'B'
          } else if (ctx.datasetIndex === 2) {
            letter = 'C'
          } else if (ctx.datasetIndex === 3) {
            letter = 'D'
          } else if (ctx.datasetIndex === 4) {
            letter = 'E'
          }

          return letter
        }
      },
      beforeDraw: function(chartInstance, easing) {
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
        ctx.fillText('(Start here!)', chartArea.left + 95, chartArea.top - 13)
        ctx.font = 'bold 12px "Helvetica Neue", Helvetica, Arial, sans-serif'
        ctx.fillText(
          '"THE SWEET SPOT"',
          chartArea.left + 68,
          chartArea.top - 28
        )

        // draw x axis labels
        ctx.fillStyle = '#9F9D9D'
        ctx.font = 'bold 12px "Helvetica Neue", Helvetica, Arial, sans-serif'
        ctx.fillText('LOW', chartArea.left, chartArea.bottom + 25)
        ctx.fillText('HIGH', chartArea.right - 30, chartArea.bottom + 25)

        // draw y axis label
        ctx.save()
        ctx.rotate((-90 * Math.PI) / 180)
        ctx.fillText('HIGH', chartArea.left - 113, chartArea.top - 35)
        ctx.restore()
      }
    }
  }
}

module.exports = (answers, cb) => {
  if (!answers) {
    return false
  }

  const asset = `${answers[2].text}-${new Date().getTime()}.jpg`

  chartOptions.data = {
    datasets: [
      {
        backgroundColor: '#EB4926',
        data: [
          {
            x: answers[7].number || 0,
            y: answers[8].number || 0,
            r: 10
          }
        ]
      },
      {
        backgroundColor: '#EB4926',
        data: [
          {
            x: answers[10].number || 0,
            y: answers[11].number || 0,
            r: 10
          }
        ]
      },
      {
        backgroundColor: '#EB4926',
        data: [
          {
            x: answers[13].number || 0,
            y: answers[14].number || 0,
            r: 10
          }
        ]
      },
      {
        backgroundColor: '#EB4926',
        data: [
          {
            x: answers[16].number || 0,
            y: answers[17].number || 0,
            r: 10
          }
        ]
      },
      {
        backgroundColor: '#EB4926',
        data: [
          {
            x: answers[19].number || 0,
            y: answers[20].number || 0,
            r: 10
          }
        ]
      }
    ]
  }

  return chartNode
    .drawChart(chartOptions)
    .then(() => {
      return chartNode.getImageBuffer('image/jpg')
    })
    .then(buffer => {
      return chartNode.getImageStream('image/jpg')
    })
    .then(streamResult => {
      return chartNode.writeImageToFile('image/jpg', `img/${asset}`)
    })
    .then(() => {
      setTimeout(() => {
        const uploader = s3Client.uploadFile({
          localFile: `img/${asset}`,
          s3Params: {
            Bucket: 'impacteffort',
            Key: `charts/${asset}`
          }
        })

        uploader.on('error', function(err) {
          console.error('unable to upload:', err.stack)
        })

        uploader.on('progress', function() {
          console.log(
            'progress',
            uploader.progressAmount,
            uploader.progressTotal
          )
        })

        uploader.on('end', function() {
          console.log('Image saved ✅')
          console.log('Sending email...')

          return cb({ answers, chart: `${s3Bucket}/charts/${asset}` })
        })
      })
    }, 1000)
}
