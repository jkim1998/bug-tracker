import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAaa3An_ySfT2amZppeTwQSHinmZ2LRy4E",
  authDomain: "bugtracker-a8e60.firebaseapp.com",
  projectId: "bugtracker-a8e60",
  storageBucket: "bugtracker-a8e60.appspot.com",
  messagingSenderId: "847776213279",
  appId: "1:847776213279:web:e1d66b4135bfec0a27a82a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };