import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/analytics';
import 'firebase/auth';
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDpLCX1_lro9dkyu7vhvk-aajfVQ5hn-8U",
    authDomain: "sehatin-eab72.firebaseapp.com",
    projectId: "sehatin-eab72",
    storageBucket: "sehatin-eab72.appspot.com",
    messagingSenderId: "660356129452",
    appId: "1:660356129452:web:f97bedd29f5de115377509",
    measurementId: "G-Z2SKWPBERR"
  });
}

export default firebase;

// databaseURL: "https://sainsin-db.asia-southeast1.firebasedatabase.app",
