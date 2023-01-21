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

import "../index.css";

const Login = () => {
  const [signuptoggle, setSignuptoggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { SignIn, googleSignIn, facebookSignIn, githubSignIn, user } =
    useAuth();

  const signInWithIDPW = async ({ email, password }) => {
    try {
      await SignIn(email, password);
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

  const signInPage = () => {
    setSignuptoggle(true);
  };

  const signUpPage = () => {
    setSignuptoggle(false);
  };
  // useEffect(() => {
  //   if (user != null) {
  //     navigate("/");
  //   } else {
  //     navigate("login")
  //   }
  // }, [user]);
  return (
    <>
      {signuptoggle ? (
        <div className="login">
          <button onClick={signUpPage}>sign up</button>
          <form id="login">
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
            <button type="submit" onClick={signInWithIDPW(email, password)}>Log in</button>
          </form>
          <p>{/* need account? <a href="signup">Sign up</a> */}</p>
        </div>
      ) : (
        <div className="login">
          <form id="login">
            <button onClick={signInPage}>sigin in</button>
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="password" />
            <button className="sign_in">sign up</button>
          </form>
        </div>
      )}
      <button id="google" className="sign_in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      {/* <button id="facebook" className="sign_in" onClick={signInWithFacebook}>
        Sign in with Facebook
      </button> */}
      <button id="facebook" className="sign_in" onClick={signInWithGithub}>
        Sign in with Github
      </button>
      <p>
        need account? <a href="signup">Sign up</a>
      </p>
      {/* <button onClick={handelSignOut}>sign out</button> */}
    </>
  );
};

export default Login;
