require('dotenv').config({ path: '../.env' })

const ChartjsNode = require('chartjs-node')
const s3 = require('s3')
const path = require('path')

const s3Bucket = process.env.S3_BUCKET_URL
const s3Client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
})

const chartNode = new ChartjsNode(600, 600)
const chartOptions = {
  type: 'bubble',
  options: {
    tooltips: {
      enabled: false
    },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'impact',
            fontFamily: 'Menlo',
            fontSize: 16,
            fontColor: 'black'
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
            labelString: 'effort',
            fontFamily: 'Menlo',
            fontSize: 16,
            fontColor: 'black'
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
    }
  },
  plugins: {
    beforeDraw: function(chartInstance, easing) {
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
    }
  }
}

module.exports = (answers, cb) => {
  if (!answers) {
    return false
  }

  const asset = `${new Date().getTime()}.jpg`

  chartOptions.data = {
    datasets: [
      {
        backgroundColor: 'red',
        data: [
          {
            x: answers[1].number || 0,
            y: answers[2].number || 0,
            r: 10
          }
        ]
      },
      {
        backgroundColor: 'blue',
        data: [
          {
            x: answers[4].number || 0,
            y: answers[5].number || 0,
            r: 10
          }
        ]
      },
      {
        backgroundColor: 'green',
        data: [
          {
            x: answers[7].number || 0,
            y: answers[8].number || 0,
            r: 10
          }
        ]
      },
      {
        backgroundColor: 'orange',
        data: [
          {
            x: answers[10].number || 0,
            y: answers[11].number || 0,
            r: 10
          }
        ]
      },
      {
        backgroundColor: 'pink',
        data: [
          {
            x: answers[13].number || 0,
            y: answers[14].number || 0,
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

          cb({ answers, asset })
        })
      })
    }, 1000)
}
