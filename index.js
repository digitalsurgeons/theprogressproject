require('dotenv').config()

const express = require('express')
const ChartjsNode = require('chartjs-node')
const s3 = require('s3')
const path = require('path')
const mailgun = require('mailgun.js')

const app = express()
app.use(express.json())

const s3Bucket = process.env.S3_BUCKET_URL
const s3Client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
})

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY
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

app.post('/', (request, response) => {
  console.log('\nNew response')
  console.log(request.body.form_response.answers)
  drawChart(request.body.form_response.answers)
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`)
})

function drawChart(answers) {
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

          mg.messages
            .create('impacteffort.digitalsurgeons.com', {
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
                <img src="${s3Bucket}/charts/${asset}" />
                <ul>
                  <li>${answers[0].text}</li>
                  <li>${answers[3].text}</li>
                  <li>${answers[6].text}</li>
                  <li>${answers[9].text}</li>
                  <li>${answers[12].text}</li>
                </ul>
              `
            })
            .then(msg => console.log(msg))
            .catch(err => console.log(err))
        })
      })
    }, 1000)
}

const arrayFromObject = content => {
  const val = []
  for (const key in content) {
    val.push({ name: key, content: content[key] })
  }
  return val
}
