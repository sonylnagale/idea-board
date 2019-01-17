const firebase = require('firebase-admin')
const xssFilters = require('xss-filters')

const express = require('express')
const router = express.Router()

/** DELETE an idea */
router.post('/', function (req, res, next) {
  const id = xssFilters.inHTMLData(req.body.id)
  const name = xssFilters.inHTMLData(req.body.name)
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/' + name + '/ideas/')

  dbRef.child(id).remove()
    .then(() => {
      res.setHeader('Content-Type', 'application/json')

      const dbRef = firebase.database().ref(`/${ name }`)
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
})

/** DELETE a user */
router.post('/:name', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/')

  dbRef.child(req.params.name).remove()

  res.sendStatus(200)
})

module.exports = router
