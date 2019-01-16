const firebase = require('firebase-admin')
require('dotenv').config()

const express = require('express')
const router = express.Router()

firebase.initializeApp({
  credential: firebase.credential.cert({
    'private_key': process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    'client_email': process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: 'https://idea-board-bd745.firebaseio.com'
})


/* GET all records page. */
router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/')
  dbRef.once('value').then(function (snapshot) {
    const contents = snapshot.val()
    const ideas = []
    let values = {}

    Object.entries(contents).forEach(([ userkey, uservalue ]) => {
      const userIdeas =  []
      Object.entries(uservalue).forEach(([ key, value ]) => {
        Object.entries(value).forEach(([ ideaKey, ideaValue ]) => {
          userIdeas.push({ id: ideaKey, 'description': ideaValue.description, 'title': ideaValue.title })
        })
      })
      ideas.push(userIdeas)
      values = Object.assign({ [userkey]: userIdeas }, values)
    })

    res.send(JSON.stringify(values))
  })
})

module.exports = router
