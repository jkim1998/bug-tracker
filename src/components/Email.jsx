import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export const Email = () => {
  const form = useRef();

  const [status, setStatus] = useState("");
  const [error_email, setErrorEmail] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SUB_SERVICE,
        process.env.REACT_APP_EMAILJS_SUB_TEMPLATE,
        form.current,
        process.env.REACT_APP_EMAILJS_SUB_API
      )
      .then(
        (result) => {
          console.log(result.text);
          // console.log("message sent");
          setStatus("SUCCESS");
        },
        (error) => {
          console.log(error.text);
          setStatus("FAILED");
        }
      );
  };

  // success message time out after certain time(3000)
  // useEffect(() => {
  //   if (status === "SUCCESS") {
  //     setTimeout(() => {
  //       setStatus("");
  //     }, 3000);
  //   }
  // }, [status]);

  return (
    <>
      <div className="contactMe">
        {status && renderAlert()}
        {!status && (
          <form ref={form} onSubmit={sendEmail}>
            <div className="subscribe_container">
              <div className="email_container">
                <input
                  type="email"
                  name="user_email"
                  placeholder="your email address"
                  className="email"
                  required="required"
                  onInvalid={invalidEmail()}
                />
              </div>
              <input type="submit" value="Subscribe" className="send" />
            </div>
            <input type="checkbox" required="required" />
          </form>
        )}
      </div>
    </>
  );
};
const renderAlert = () => (
  <div className="confirmation">
    <p>You are Subscribed to Newsletter!</p>
  </div>
);

const invalidEmail = () => {
  <div>
    <p>this is required</p>
  </div>;
};
