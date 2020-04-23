require('dotenv').config()

const firebaseAdmin = require('firebase-admin')
const { v4: uuidv4 } = require('uuid')
const firebaseServiceAccount = require('../firebaseKey.json')

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
  databaseURL: process.env.FIREBASE_URL,
})

const db = firebaseAdmin.firestore()

module.exports = {
  store: (answers, cb) => {
    if (answers.length < 3) {
      return
    }

    const dbData = {
      user: {
        name: {
          first: answers[0].text,
          last: answers[1].text,
        },
      },
    }

    const impactEffortTmp = {
      id: uuidv4(),
      org: answers[3].text,
      orgType: answers[4].choice.label,
      role: answers[5].choice.label,
      obj: answers[6].text,
      tactics: [
        {
          tactic: answers[7].text,
          effort: answers[8].number,
          impact: answers[9].number,
        },
        {
          tactic: answers[10].text,
          effort: answers[11].number,
          impact: answers[12].number,
        },
      ],
    }

    if (answers[15] && answers[15].number && answers[16].number) {
      impactEffortTmp.tactics.push({
        tactic: answers[14].text,
        effort: answers[15].number,
        impact: answers[16].number,
      })
    }

    if (answers[19] && answers[19].number && answers[20].number) {
      impactEffortTmp.tactics.push({
        tactic: answers[18].text,
        effort: answers[19].number,
        impact: answers[20].number,
      })
    }

    if (answers[23] && answers[23].number && answers[24].number) {
      impactEffortTmp.tactics.push({
        tactic: answers[22].text,
        effort: answers[23].number,
        impact: answers[24].number,
      })
    }

    const doc = db.doc(`users/${String(answers[2].email)}`)

    doc
      .get()
      .then((doc) => {
        const newData = {
          user: dbData.user,
          impactEffort: [impactEffortTmp],
        }

        if (doc.exists) {
          let existingData = doc.data()

          if (existingData.impactEffort && existingData.impactEffort.length) {
            existingData.impactEffort.push(impactEffortTmp)
            newData.impactEffort = existingData.impactEffort
          }
        }

        db.collection('users').doc(String(answers[2].email)).set(newData)
        return
      })
      .catch((err) => {
        console.log(err)
        return
      })
  },
}
