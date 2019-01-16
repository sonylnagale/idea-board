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

/* GET individual's page. */
router.get('/:id', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/' + req.params.id)
  const ideas = []
  dbRef.once('value').then(function (snapshot) {
    if (snapshot.exists()) {
      const contents = snapshot.val()
      Object.entries(contents.ideas).forEach(([ key, value ]) => {
        ideas.push({ id: key, 'description': value.description, 'title': value.title })
      })

      res.send(ideas)
    } else {
      res.sendStatus(404)
    }

  })
})

module.exports = router
