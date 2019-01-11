const firebase = require("firebase-admin");

const express = require('express');
const router = express.Router();

const serviceAccount = require("../serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://idea-board-bd745.firebaseio.com"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  const dbRef = firebase.database().ref('/')
  dbRef.once('value').then(function(snapshot) {
    const contents = snapshot.val()
    console.log(contents)
  })
  
  res.render('list', { title: 'Express' });
});

module.exports = router;
