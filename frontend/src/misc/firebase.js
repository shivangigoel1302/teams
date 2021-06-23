import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyB9lm-KyL26Yj97Cku9Ayl3UyRCAKtgRZo",
    authDomain: "teams-da334.firebaseapp.com",
    databaseURL: "https://teams-da334-default-rtdb.firebaseio.com",
    projectId: "teams-da334",
    storageBucket: "teams-da334.appspot.com",
    messagingSenderId: "544716487079",
    appId: "1:544716487079:web:fee4d61d97c69d1b189e82"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(config);

  export const auth = app.auth();
  export const database = app.database();
  export const storage = app.storage();
