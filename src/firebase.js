import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaa3An_ySfT2amZppeTwQSHinmZ2LRy4E",
  authDomain: "bugtracker-a8e60.firebaseapp.com",
  projectId: "bugtracker-a8e60",
  storageBucket: "bugtracker-a8e60.appspot.com",
  messagingSenderId: "847776213279",
  appId: "1:847776213279:web:e1d66b4135bfec0a27a82a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
// const auth = getAuth(app);

// export { app, auth };
