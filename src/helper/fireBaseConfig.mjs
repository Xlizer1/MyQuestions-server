// const firebase = require("firebase");

// const firebaseConfig = {
//   apiKey: "AIzaSyCf1PSOItvog37WtOSb25tA0kSfny7WNEI",
//   authDomain: "asia-paint.firebaseapp.com",
//   projectId: "asia-paint",
//   storageBucket: "asia-paint.appspot.com",
//   messagingSenderId: "1042357086417",
//   appId: "1:1042357086417:web:c0f5446d853c15295e3df0",
//   measurementId: "G-EH49X2W5E2"
// };

// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// const User = db.collection("Users");
// const Product = db.collection("Product");

// module.exports = User;

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf1PSOItvog37WtOSb25tA0kSfny7WNEI",
  authDomain: "asia-paint.firebaseapp.com",
  projectId: "asia-paint",
  storageBucket: "asia-paint.appspot.com",
  messagingSenderId: "1042357086417",
  appId: "1:1042357086417:web:c0f5446d853c15295e3df0",
  measurementId: "G-EH49X2W5E2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebase.firestore(app);

const User = db.collection("Users");
const Product = db.collection("Product");

module.exports = User;