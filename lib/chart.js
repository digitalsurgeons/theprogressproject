require('dotenv').config({ path: '../.env' })

const ChartjsNode = require('chartjs-node')
const ChartDataLabels = require('chartjs-plugin-datalabels')
const s3 = require('s3')
const path = require('path')
const _ = {
  random: require('lodash/random'),
}

const s3Bucket = process.env.S3_BUCKET_URL
const s3Client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
})

const chartNode = new ChartjsNode(560, 560)
const chartOptions = {
  type: 'bubble',
  options: {
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 50,
      },
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'IMPACT',
            fontSize: 12,
            fontColor: 'black',
            fontStyle: 'bold',
          },
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 11,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'EFFORT',
            fontSize: 12,
            fontColor: 'black',
            fontStyle: 'bold',
          },
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 11,
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        color: 'white',
        font: {
          family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          weight: 'bold',
          size: 10,
        },
        formatter: function (value, ctx) {
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
        },
      },
      beforeDraw: function (chartInstance, easing) {
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
      },
    },
  },
}

const randomize = (num) => {
  return num + _.random(-0.2, 0.2)
}

const formatTactic = (label, effort, impact) => {
  return {
    label,
    effort: randomize(effort),
    impact: randomize(impact),
  }
}

module.exports = (answers, cb) => {
  if (!answers) {
    return false
  }

  const asset = `${answers[2].email}-${new Date().getTime()}.jpg`

  // store required tactics
  const tactics = [
    formatTactic(answers[7].text, answers[8].number, answers[9].number),
    formatTactic(answers[10].text, answers[11].number, answers[12].number),
  ]

  // add optional tactics
  if (answers[15] && answers[15].number && answers[16].number) {
    tactics.push(
      formatTactic(answers[14].text, answers[15].number, answers[16].number)
    )
  }

  if (answers[19] && answers[19].number && answers[20].number) {
    tactics.push(
      formatTactic(answers[18].text, answers[19].number, answers[20].number)
    )
  }

  if (answers[23] && answers[23].number && answers[24].number) {
    tactics.push(
      formatTactic(answers[22].text, answers[23].number, answers[24].number)
    )
  }

  // reorder tactics based on high impact low effort
  tactics
    .sort((x, y) => {
      return x.impact < y.impact
    })
    .sort((x, y) => {
      return x.effort > y.effort
    })

  answers.tactics = tactics
  const datasets = []

  answers.tactics.forEach((tactic) => {
    datasets.push({
      backgroundColor: '#EB4926',
      data: [
        {
          y: tactic.impact || 0,
          x: tactic.effort || 0,
          r: 10,
        },
      ],
    })
  })

  chartOptions.data = { datasets }

  return chartNode
    .drawChart(chartOptions)
    .then(() => {
      return chartNode.getImageBuffer('image/jpg')
    })
    .then((buffer) => {
      return chartNode.getImageStream('image/jpg')
    })
    .then((streamResult) => {
      return chartNode.writeImageToFile('image/jpg', `img/${asset}`)
    })
    .then(() => {
      setTimeout(() => {
        const uploader = s3Client.uploadFile({
          localFile: `img/${asset}`,
          s3Params: {
            Bucket: 'impacteffort',
            Key: `charts/${asset}`,
          },
        })

        uploader.on('error', function (err) {
          console.error('unable to upload:', err.stack)
        })

        uploader.on('progress', function () {
          console.log(
            'progress',
            uploader.progressAmount,
            uploader.progressTotal
          )
        })

        uploader.on('end', function () {
          console.log('Image saved ✅')
          console.log('Sending email...')

          return `${s3Bucket}/charts/${asset}`
        })
      }, 1000)
    })
    .catch((err) => {
      console.log(err)
      return
    })
}
