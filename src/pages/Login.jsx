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
