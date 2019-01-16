const firebase = require('firebase-admin')

const express = require('express')
const router = express.Router()

router.get('/all', function (req, res, next) {
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

router.get('/:id', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref(`/${ req.params.id }`)
  dbRef.once('value').then(function (snapshot) {
    if (snapshot.exists()) {
      res.send(snapshot.val())
    } else {
      res.sendStatus(404)
    }
  })
})

router.get('/:id/ideas', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref(`/${ req.params.id }`)
  dbRef.once('value').then(function (snapshot) {
    if (snapshot.exists()) {

      const ideas = []

      Object.entries(snapshot.val().ideas).forEach(([ key, value ]) => {
        ideas.push( { key, value } )
      })

      res.send(JSON.stringify(ideas))
    } else {
      res.sendStatus(404)
    }
  })
})

router.post('/', function (req, res, next) {
  const userName = req.body.userName

  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/')

  dbRef.push({}).then((response) => {
    const id = response.key
    firebase.database().ref(userName).set({
      id,
      userName,
      ideas: []
    })
    res.sendStatus(200)
  })
})

module.exports = router
