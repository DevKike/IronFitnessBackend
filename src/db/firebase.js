// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfWf04RUO2X7-jqdEWHQ1zoditfiGvtp0",
  authDomain: "iron-fitness-bucket.firebaseapp.com",
  projectId: "iron-fitness-bucket",
  storageBucket: "iron-fitness-bucket.appspot.com",
  messagingSenderId: "972771771804",
  appId: "1:972771771804:web:04b5c21c213ad24ff07459"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

module.exports = firebaseApp;