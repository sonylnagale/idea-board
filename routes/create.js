const firebase = require("firebase-admin")
require('dotenv').config()
const xssFilters = require('xss-filters')

const express = require('express')
const router = express.Router()

/* GET individual page. */
router.post('/:id', function(req, res, next) {
  const description = xssFilters.inHTMLData(req.body.description),
        title = xssFilters.inHTMLData(req.body.title)
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/' + req.params.id  + '/ideas')

  dbRef.push({
    description,
    title,
  })
})

router.get('/', function(req, res, next) {
  res.render('create', {})
})

module.exports = router
