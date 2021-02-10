import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyADcyOxHR0XziXJ_R9bK66p7f1gk3H23l8",
    authDomain: "india-chat-app-b1493.firebaseapp.com",
    projectId: "india-chat-app-b1493",
    storageBucket: "india-chat-app-b1493.appspot.com",
    messagingSenderId: "451466993432",
    appId: "1:451466993432:web:0bdc4a14d6fef2c5d9c86d"
  };

  const app = firebase.initializeApp(firebaseConfig);
const database = app.firestore();

export default database;