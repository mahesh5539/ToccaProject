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

function getFirebaseData(collectionName, limit, startAt, callback){
    firebase.database().ref(collectionName).orderByChild('timestamp').startAt(startAt).limitToFirst(limit).once('value').then(function(snapshot) {
        callback(snapshot);
    });
}

exports.getFirebaseData = getFirebaseData;