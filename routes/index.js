var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyA_cHWW_eAT70amAaaQiO82kdiEJghed9Y",
  authDomain: "toccaproject.firebaseapp.com",
  databaseURL: "https://toccaproject.firebaseio.com",
  projectId: "toccaproject",
  storageBucket: "toccaproject.appspot.com",
  messagingSenderId: "229361495798"
};
firebase.initializeApp(config);

router.get('/user-profile', function(req, res, next) {
    res.render('index');
});

router.get('/user-profiles', function(req, res, next) {

  let limit = req.query.limit;
  let startAt = req.query.startAt;

  if(!limit){
    limit = 51;
  }
  if(!startAt){
    startAt = 1;
  }

  firebase.database().ref('/user_profile').orderByChild('timestamp').startAt(startAt).limitToFirst(Number(limit)).once('value').then(function(snapshot) {
    var data = snapshot.val();
    res.send(data);
  })
});

module.exports = router;
