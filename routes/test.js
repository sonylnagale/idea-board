const firebase = require("firebase-admin")
require('dotenv').config()
const xssFilters = require('xss-filters')

const express = require('express')
const router = express.Router()

/* GET individual page. */
router.post('/create', function(req, res, next) {
  console.log('creating')
  const description = xssFilters.inHTMLData(req.body.description),
        title = xssFilters.inHTMLData(req.body.title),
        id = xssFilters.inHTMLData(req.body.name)
  res.setHeader('Content-Type', 'application/json')
console.log(id);
  const dbRef = firebase.database().ref('/' + id  + '/ideas')

  dbRef.push({
    description,
    title,
  })
  res.sendStatus(200)

})

router.get('/create', function(req, res, next) {
  res.render('testcreate', {})
})

module.exports = router
