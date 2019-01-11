const firebase = require("firebase-admin");
require('dotenv').config()

const express = require('express');
const router = express.Router();

firebase.initializeApp({
  credential: firebase.credential.cert({
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: "https://idea-board-bd745.firebaseio.com"
});

/* GET individual page. */
router.get('/:id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/' + req.params.id)

  dbRef.once('value').then(function(snapshot) {
    const contents = snapshot.val()
    res.send(JSON.stringify(contents))
  })
})

/* GET all records page. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')

  const dbRef = firebase.database().ref('/')

  dbRef.once('value').then(function(snapshot) {
    const contents = snapshot.val()
    res.send(JSON.stringify(contents))
  })
})

module.exports = router;
