const admin = require('firebase-admin');
const firebase = require('firebase/app');
const { projectId, storageBucket, databaseUrl } = require('../config/index');
require('firebase/auth');
require('firebase/storage')
require('firebase/database')

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
let firebaseApp;
if (process.env.NODE_ENV === 'development'){
    const serviceAccount = require("../config/highway420.json")

    firebaseApp = admin.initializeApp({
        projectId,
        credential: admin.credential.cert(serviceAccount),
        storageBucket

    });
} else if (process.env.NODE_ENV === 'production') {
    firebaseApp = admin.initializeApp({
        projectId,
        credential: admin.credential.applicationDefault(),
        storageBucket

    });
} else{
    const serviceAccount = require("../config/highway420.json")

    firebaseApp = admin.initializeApp({
        projectId,
        credential: admin.credential.cert(serviceAccount),
        storageBucket

    });
}


const db = firebase.database()
const auth = firebase.auth()
const adminControl = admin.auth()
const storage = admin.storage().bucket()
module.exports = {
    auth,
    firebaseApp,
    firebaseConfig,
    firebase,
    storage,
    adminControl,
    db
};