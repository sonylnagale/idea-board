const firebase = require('firebase-admin')

const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/')
  dbRef.once('value').then(function (snapshot) {
    const contents = snapshot.val()
    const users = []

    Object.entries(contents).forEach(([ key, value ]) => {
      users.push(key)
    })

    res.send(JSON.stringify(users))
  })
})

module.exports = router
