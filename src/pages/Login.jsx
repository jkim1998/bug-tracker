import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import SignUp from "./SignUp";

import "../index.css";
import "./test.css";

const Login = () => {
  const [data, setData] = useState({});
  const [err, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { SignIn, googleSignIn, facebookSignIn, githubSignIn, user } =
    useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/main");
      })
      .catch((error) => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  const signInWithGoogle = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  // const signInWithGoogle = async () => {
  //   const provider = new GoogleAuthProvider();
  //   const signInWithGoogle = async () => {
  //     try {
  //       const res = await signInWithPopup(auth, provider);
  //       const user = res.user;
  //       const q = query(collection(db, "users"), where("uid", "==", user.uid));
  //       const docs = await getDoc(q);
  //       if (docs.docs.length === 0) {
  //         await addDoc(collection(db, "users"), {
  //           uid: user.uid,
  //           name: user.displayName,
  //           authProvider: "google",
  //           email: user.email,
  //         });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       alert(err.message);
  //     }
  //   };
  // };

  const signInWithFacebook = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  const signInWithGithub = async () => {
    try {
      await githubSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (user != null) {
  //     navigate("/main");
  //   } else {
  //     navigate("/login")
  //   }
  // }, [user]);

  return (
    <div className="test1">
      <div className="test2">
        <form id="login" className="test22" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="test3">sign in</button>
        </form>
        <button id="google" className="test3" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        {/* <button id="facebook" className="sign_in" onClick={signInWithFacebook}>
        Sign in with Facebook
      </button> */}
        <button id="facebook" className="test3" onClick={signInWithGithub}>
          Sign in with Github
        </button>
        {/* <button onClick={handelSignOut}>sign out</button> */}
        <a href="/signup">Sign up</a>
        {err && <p className="err_msg">Wrong Email or password</p>}
      </div>
    </div>
  );
};

export default Login;
