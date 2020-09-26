const config = require('../config');
const admin = require('firebase-admin');
const firebase = require('firebase/app');
const { projectId, storageBucket } = require('../config');
require('firebase/auth');
require('firebase/storage')

const firebaseConfig = {
    apiKey: "AIzaSyC4Zv2URk6mv_444druT3HBcsbDpNTTIlg",
    authDomain: "highway420canna-1b27e.firebaseapp.com",
    databaseURL: "https://highway420canna-1b27e.firebaseio.com",
    projectId: "highway420canna-1b27e",
    storageBucket: "highway420canna-1b27e.appspot.com",
    messagingSenderId: "765697280639",
    appId: "1:765697280639:web:c29a8744c11dd6b0f70d4a",
    measurementId: "G-S8BS2WM0GX"
};
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
    projectId,
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://highway420canna-1b27e.firebaseio.com/',
    storageBucket
});


const db = admin.database()
const auth = firebase.auth()
const adminControl = admin.auth()
const bucketRef = firebase.st
const storage = admin.storage().bucket()
module.exports = {
    auth,
    firebase,
    storage,
    bucketRef,
    adminControl,
    db
};