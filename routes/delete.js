const firebase = require('firebase-admin')
const xssFilters = require('xss-filters')

const express = require('express')
const router = express.Router()

router.post('/', function (req, res, next) {
  const id = xssFilters.inHTMLData(req.body.id)
  const name = xssFilters.inHTMLData(req.body.name)
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/' + name + '/ideas/')

  dbRef.child(id).remove()

  res.sendStatus(200)
})

router.post('/:name', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/')

  dbRef.child(req.params.name).remove()

  res.sendStatus(200)
})

module.exports = router
