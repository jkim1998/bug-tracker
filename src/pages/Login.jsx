import React, { useState } from "react";
import { app, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import "../index.css";

const Login = () => {
  const [signuptoggle, setSignuptoggle] = useState(false);

  const navigate = useNavigate();
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  };

  const signInPage = () => {
    setSignuptoggle(true);
  };

  const signUpPage = () => {
    setSignuptoggle(false);
  };
  // function SignOut() {
  //   return (
  //     auth.currentUser && (
  //       <button className="sign_out" onClick={() => auth.signOut()}>
  //         <p> sign out</p>
  //       </button>
  //     )
  //   );
  // }

  return (
    <>
      {signuptoggle ? (
        <div className="login">
          <button onClick={signUpPage}>sign up</button>
          <form id="login">
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="password" />
            <button className="sign_in">Log in</button>
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
      <button id="facebook" className="sign_in" onClick={signInWithFacebook}>
        Sign in with Facebook
      </button>
      <p>
        need account? <a href="signup">Sign up</a>
      </p>
      {/* <SignOut /> */}
    </>
  );
};

export default Login;
