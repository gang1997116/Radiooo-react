// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAzvWajdrecUWIokjb3rcl7rA07LeV3QQU",
    authDomain: "radiooo-199722.firebaseapp.com",
    databaseURL: "https://radiooo-199722.firebaseio.com",
    projectId: "radiooo-199722",
    storageBucket: "radiooo-199722.appspot.com",
    messagingSenderId: "811423475584",
    appId: "1:811423475584:web:eb616277119fa1b6d28365",
    measurementId: "G-V2CLVRF0WP"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export function addUser(){
db.collection("users").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});
}