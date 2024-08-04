// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQYst5W31ni0SVQgDTZ8dgXPbvuNAcNmQ",
  authDomain: "lkasse-4bcff.firebaseapp.com",
  projectId: "lkasse-4bcff",
  storageBucket: "lkasse-4bcff.appspot.com",
  messagingSenderId: "253995780669",
  appId: "1:253995780669:web:b9a689480a98918e1a3854"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
