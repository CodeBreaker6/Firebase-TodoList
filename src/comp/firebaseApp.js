import firebase from 'firebase/app';
import 'firebase/firestore';

// Here is the firebase config
// You can get it from your firebase project
// https://firebase.google.com/docs/web/setup
const firebaseConfig = {
    apiKey: "apiKey", // type your apiKey
    authDomain: "authDomain", //  type your authDomain
    projectId: "projectId", // type your projectId
    storageBucket: "storageBucket", // type your storageBucket
    messagingSenderId: "messagingSenderId", // type your messagingSenderId
    appId: "appId" // type your appId
  };

  firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();