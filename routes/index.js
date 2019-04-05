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

  var limit = req.query.limit;
  var startAt = req.query.nextPageIndex;
  var result = {};

  if(!limit){
    limit = 51;
  }else{
    limit = Number(limit) + 1;
  }

  if(!startAt){
    startAt = 1;
  }

  firebase.database().ref('/user_profile').orderByChild('timestamp').startAt(startAt).limitToFirst(limit).once('value').then(function(snapshot) {
    var data = snapshot.val();
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    var nextIndex = returnArr.pop().timestamp;

    result.nextPageIndex = nextIndex;
    result.nextPageUrl = "/user-profiles?limit=50&nextPageIndex=" + nextIndex;
    result.userProfiles = returnArr;

    res.send(result);
  })
});

module.exports = router;
