import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCf1PSOItvog37WtOSb25tA0kSfny7WNEI",
    authDomain: "asia-paint.firebaseapp.com",
    projectId: "asia-paint",
    storageBucket: "asia-paint.appspot.com",
    messagingSenderId: "1042357086417",
    appId: "1:1042357086417:web:c0f5446d853c15295e3df0",
    measurementId: "G-EH49X2W5E2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const Product = db.collection("Products");

module.exports = Product;