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
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import SignUp from "./SignUp";

import "../index.css";
import "./test.css";

const Login = () => {
  const [data, setData] = useState({});
  const [err, setError] = useState();
  const navigate = useNavigate();

  const { SignIn, googleSignIn, facebookSignIn, githubSignIn, user } =
    useAuth();

  const signInWithID = async () => {
    try {
      await SignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

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
  //     navigate("/");
  //   } else {
  //     navigate("login")
  //   }
  // }, [user]);

  return (
    <div className="test1">
      <div className="test2">
        <form id="login" className="test22">
          <input
            type="text"
            placeholder="Email"
            value={data.email}
          />
          <input
            type="text"
            placeholder="password"
            value={data.password}
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
      </div>
    </div>
  );
};

export default Login;
