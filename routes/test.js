const firebase = require('firebase-admin')
require('dotenv').config()
const xssFilters = require('xss-filters')

const express = require('express')
const router = express.Router()

router.post('/create', function (req, res, next) {
  const description = xssFilters.inHTMLData(req.body.description)
  const title = xssFilters.inHTMLData(req.body.title)
  const id = xssFilters.inHTMLData(req.body.name)
  res.setHeader('Content-Type', 'application/json')
  const dbRef = firebase.database().ref('/' + id + '/ideas')

  dbRef.push({
    description,
    title
  })
  res.sendStatus(200)
})

router.get('/create', function (req, res, next) {
  res.render('testcreate', {})
})

router.get('/delete', function (req, res, next) {
  res.render('testdelete', {})
})

router.post('/delete', function (req, res, next) {
  const id = xssFilters.inHTMLData(req.body.id)
  const name = xssFilters.inHTMLData(req.body.name)
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/' + name + '/ideas')

  dbRef.child(id).remove()

  res.sendStatus(200)
})

router.get('/update', function (req, res, next) {
  res.render('testupdate', {})
})

router.post('/update', function (req, res, next) {
  const description = xssFilters.inHTMLData(req.body.description)
  const title = xssFilters.inHTMLData(req.body.title)
  const name = xssFilters.inHTMLData(req.body.name)
  const id = xssFilters.inHTMLData(req.body.id)

  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/' + name + '/ideas/' + id)

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

/* GET all users page. */
router.get('/listUsers', function (req, res, next) {
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
