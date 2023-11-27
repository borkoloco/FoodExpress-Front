// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

import firebase from "firebase";
//import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcdL8AXgUgmzNT5XZSrxihSVDSOR_WqHo",
  authDomain: "foodexpress-e36f1.firebaseapp.com",
  projectId: "foodexpress-e36f1",
  storageBucket: "foodexpress-e36f1.appspot.com",
  messagingSenderId: "39890679238",
  appId: "1:39890679238:web:ceda2f04ff68f14634eec7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const firebase = initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);
// export default app;
export { db, googleAuthProvider, firebase, auth };
