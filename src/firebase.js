import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmdR2xekej-pheMBZeXUHmrrbG9icqp9A",
  authDomain: "e-commerce-aba6b.firebaseapp.com",
  projectId: "e-commerce-aba6b",
  storageBucket: "e-commerce-aba6b.appspot.com",
  messagingSenderId: "388447852365",
  appId: "1:388447852365:web:f598683b8f72359ac24904",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();
// const auth = getAuth(app);

// export { app, auth };
