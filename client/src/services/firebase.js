import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/analytics'
const firebaseConfig = {
  apiKey: "AIzaSyCUQ5RN6rkd2kb-GTgZQH-RQA-L17KiwK0",
  authDomain: "high420canna.firebaseapp.com",
  databaseURL: "https://high420canna.firebaseio.com",
  projectId: "high420canna",
  storageBucket: "high420canna.appspot.com",
  messagingSenderId: "85707079192",
  appId: "1:85707079192:web:0f3a6c4f72b2cf1fd98d6d",
  measurementId: "G-5DD8HJTBBT"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage()
export const analytics = firebase.analytics()
