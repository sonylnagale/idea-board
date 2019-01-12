const firebase = require("firebase-admin")
const xssFilters = require('xss-filters')

const express = require('express')
const router = express.Router()

router.post('/', function(req, res, next) {
  const description = xssFilters.inHTMLData(req.body.description),
        title = xssFilters.inHTMLData(req.body.title),
        name = xssFilters.inHTMLData(req.body.name),
        id = xssFilters.inHTMLData(req.body.id)

  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/' + name + '/s' + id)

  let props = {}

  if (description !== undefined) {
    props.description = description
  }

  if (title  !== undefined) {
    props.title = title
  }

  dbRef.update(props)

  res.sendStatus(200)
})

router.get('/', function(req, res, next) {
  res.render('create', {})
})

module.exports = router
