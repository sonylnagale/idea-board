const firebase = require('firebase-admin')
const xssFilters = require('xss-filters')
const fs = require('fs')

const express = require('express')
const router = express.Router()

router.post('/:id', function (req, res, next) {
  const description = xssFilters.inHTMLData(req.body.description)
  const title = xssFilters.inHTMLData(req.body.title)
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/' + req.params.id + '/ideas')

  dbRef.push({
    description,
    title
  })

  res.sendStatus(200)
})

router.get('/', function (req, res, next) {
  res.render('create', {})
})

router.get('/seed', function (req, res, next) {
  fs.readFile('public/javascripts/seed.json', 'utf8', function (err, contents) {
    const dbRef = firebase.database().ref('/Sonyl')
    dbRef.set(JSON.parse  (contents))
  })
  res.render('seed', {})
})

module.exports = router
