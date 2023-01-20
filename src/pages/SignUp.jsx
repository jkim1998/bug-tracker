import React from "react";

const SignUp = () => {
  return (
    <div className="login">
      <form id="login">
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="password" />
        <button className="sign_in">Log in</button>
      </form>
      <button id="google" className="sign_in">
        Sign in with Google
      </button>
      <button id="facebook" className="sign_in">
        Sign in with Facebook
      </button>
      <a href="/login">have account? log in</a>
    </div>
  );
};

export default SignUp;
