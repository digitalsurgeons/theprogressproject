require('dotenv').config()

const express = require('express')
const crypto = require('crypto')
const chart = require('./lib/chart')
const mail = require('./lib/mail')
const template = require('./lib/template')
const db = require('./lib/db')

const app = express()

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    },
  })
)
app.use(express.static('public'))

app.post('/progress', async (req, res) => {
  const expectedSig = req.header('Typeform-Signature')

  const hash = crypto
    .createHmac('sha256', process.env.TYPEFORM_SECRET)
    .update(req.rawBody)
    .digest('base64')

  const actualSig = `sha256=${hash}`

  if (actualSig !== expectedSig) {
    res.status(403).send('invalid')
    return
  }

  const answers = req.body.form_response.answers

  await db.store(answers)
  const chartAsset = await chart(answers)
  await mail(
    { answers, chart: chartAsset },
    {
      bcc: process.env.EMAIL,
      template,
    }
  )

  res.send('ok')
})

const { createSVGWindow } = require('svgdom')
const window = createSVGWindow()
const SVG = require('svg.js')(window)
const document = window.document
const fs = require('fs')
const sharp = require('sharp')

app.post('/act', (req, res) => {
  fs.readFile('templates/act.svg', 'utf8', (err, tmpl) => {
    if (err) {
      console.error(err)
      return
    }

    const svgEl = document.createElement('svg')
    svgEl.setAttribute('viewBox', '0 0 938.68 1017.71')
    svgEl.innerHTML = tmpl
    const draw = SVG(svgEl).size(560, 560)

    printColumns({
      a: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat consecteturpurus, id semper dui. Nam purusenim, fgucibus atthg',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat consecteturpurus, id semper dui. Nam purusenim, fgucibus atthg',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat consecteturpurus, id semper dui. Nam purusenim, fgucibus atthg',
      ],
      b: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat consecteturpurus, id semper dui. Nam purusenim, fgucibus atthg',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat consecteturpurus, id semper dui. Nam purusenim, fgucibus atthg',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat consecteturpurus, id semper dui. Nam purusenim, fgucibus atthg',
      ],
      c: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat consecteturpurus, id semper dui. Nam purusenim, fgucibus atthg',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat consecteturpurus, id semper dui. Nam purusenim, fgucibus atthg',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat consecteturpurus, id semper dui. Nam purusenim, fgucibus atthg',
      ],
    })

    fs.writeFile('img/svg-test.svg', draw.svg(), (err) => {
      console.log('Saved SVG')
      sharp('img/svg-test.svg')
        .toFormat('png')
        .toFile('img/svg-test.png')
        .then(function (info) {
          console.log('Converted to jpg')
          console.log(info)
        })
        .catch(function (err) {
          console.log(err)
        })
    })

    function printColumns(data) {
      printColumn(data.a, 55)
      printColumn(data.b, 365)
      printColumn(data.c, 690)
    }

    function printColumn(data, x) {
      const font = {
        family: 'Helvtica',
        size: 18,
        leading: '1.5em',
        'letter-spacing': 3,
      }

      const first = draw
        .text(function (add) {
          printText(data[0], add)
        })
        .font(font)
        .y(290)
        .x(x)

      const second = draw
        .text(function (add) {
          printText(data[1], add)
        })
        .font(font)
        .y(290 + first.bbox().height + 40)
        .x(x)

      const third = draw
        .text(function (add) {
          printText(data[2], add)
        })
        .font(font)
        .y(290 + first.bbox().height + 40 + second.bbox().height + 40)
        .x(x)
    }

    function printText(str, add) {
      let strLength = str.length <= 141 ? str.length : 141
      let charCount = 0
      let lineCount = 0
      let lastPoint = 0

      for (charCount = 0; charCount < strLength; charCount++) {
        // reached the end of the line
        if (lineCount >= 28) {
          let spaceFound = false
          // traverse backwards through string to find first space
          for (let i = charCount; i > 0; i--) {
            // found a space so update line to end here
            if (str[i] === ' ') {
              // print line, reset count, and continue
              add.tspan(str.slice(lastPoint, i)).newLine()
              lastPoint = i + 1
              lineCount = charCount - i
              spaceFound = true
              break
            }
          }

          // no spaces found so just end line at the character
          if (!spaceFound) {
            add.tspan(str.slice(lastPoint, charCount)).newLine()
            lastPoint = i
            lineCount = 0
          }
        }

        lineCount++
      }

      add.tspan(str.slice(lastPoint, str.length)).newLine()
    }
    res.send('ok')
  })
})

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: './templates',
  })
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`)
})
