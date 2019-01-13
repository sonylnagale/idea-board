const firebase = require('firebase-admin')
const xssFilters = require('xss-filters')

const express = require('express')
const router = express.Router()

router.put('/:user/ideas/:idea', function (req, res, next) {
  const description = req.body.description
  const title = req.body.title
  const user = req.params.user
  const idea = req.params.idea

  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref(`/${ user }/ideas/${ idea }`)

  let props = {}

  if (description !== undefined) {
    props.description = description
  }

  if (title !== undefined) {
    props.title = title
  }

  dbRef.update(props)
  res.sendStatus(200)

})

router.get('/', function (req, res, next) {
  res.render('create', {})
})

module.exports = router
