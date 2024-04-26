import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDaPPlvRKXcQ1nLEVh5T5gVnPwDgW2cTQ4",
    authDomain: "tutorial-417016.firebaseapp.com",
    projectId: "tutorial-417016",
    storageBucket: "tutorial-417016.appspot.com",
    messagingSenderId: "973776838974",
    appId: "1:973776838974:web:f138073ca8f3332baa0c6f",
    measurementId: "G-SNVZ5RP3T7"
  };

  if( !firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export { firebase };