const admin = require('firebase-admin');
const firebase = require('firebase/app');
const { projectId, storageBucket, databaseUrl } = require('../config/index');
require('firebase/auth');
require('firebase/storage')

const firebaseConfig = {
    apiKey: "AIzaSyDq0rnZ44Wn8tdLlxBnZhySMIFvp8tZ7nU",
    authDomain: "highway420-e92d7.firebaseapp.com",
    databaseURL: "https://highway420-e92d7-default-rtdb.firebaseio.com",
    projectId: "highway420-e92d7",
    storageBucket: "highway420-e92d7.appspot.com",
    messagingSenderId: "961365735461",
    appId: "1:961365735461:web:1f862d9780f0c5aa9da7cc"
};

firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    projectId,
    credential: admin.credential.applicationDefault(),
    databaseURL: databaseUrl,
    storageBucket

});


const db = admin.database()
const auth = firebase.auth()
const adminControl = admin.auth()
const storage = admin.storage().bucket()
module.exports = {
    auth,
    firebase,
    storage,
    adminControl,
    db
};