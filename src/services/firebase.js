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

export var db = firebase.firestore();
var getUser=db.collection("users");
export function addUser(email){
  getUser.doc(email).set({
  email: email,
  favorites: [],
})
}

export function updateLike(user,radio){
  getUser.doc(user.email).update({
    favorites:firebase.firestore.FieldValue.arrayUnion(radio)
  })
}
export function removeLike(user,favorites,radio){
  let temp=favorites.filter((item)=>item.i!==radio.i);
  getUser.doc(user.email).update({
    favorites:temp
  });
}

export function updateHistory(user,radio){
  let temp={...radio};
  temp.isPlaying=false;
  getUser.doc(user.email).update({
    history:firebase.firestore.FieldValue.arrayUnion(temp)
  })
}

