import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDL5ixDpCaA5aDg4HhPKCjXYq9pQ6Dyzyg",
  authDomain: "stripe-js-course-87b80.firebaseapp.com",
  projectId: "stripe-js-course-87b80",
  storageBucket: "stripe-js-course-87b80.appspot.com",
  messagingSenderId: "828338490321",
  appId: "1:828338490321:web:27237b3a84ad56a4e2aef0"
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore();
export const auth = firebase.auth();