require('dotenv').config({ path: '../.env' })
const crypto = require('crypto')

module.exports = (req) => {
  const expectedSig = req.header('Typeform-Signature')

  const hash = crypto
    .createHmac('sha256', process.env.TYPEFORM_SECRET)
    .update(req.rawBody)
    .digest('base64')

  const actualSig = `sha256=${hash}`

  if (actualSig !== expectedSig) {
    return false
  }

  return true
}
