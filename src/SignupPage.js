import App from "./App";
import React, { useState, useEffect } from "react";
import SignIn from "./SigninPage";

const SignUp = (props) => {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [pw, setPW] = useState("");
  const [pWError, setPwError] = useState("");

  const handleHaveAccount = () => {
    props.loadPage("signIn");
  };

  const handleSignUpBtn = async () => {
    if (!userName) {
      setUserNameError("Please enter your preffered username");
      return;
    }
    if (!pw || pw.length < 3) {
      setPwError("Passwod must be longer than 3 characters");
      return;
    }

    const response = await fetch("http://localhost:1001/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: userName, password: pw }),
    });

    if (response.ok) {
      props.loadPage("app");
    } else {
      setPwError("Failed to signup. try again");
    }

    console.log(response);
    // send a post request with username and password to backend
    // wait for the response from backend
    // if sucessful, log in to the quiz daily page
    // if not sucessful, show error message
  };

  const handleUserName = (event) => {
    setUserName(event.target.value);
    setUserNameError("");
  };

  const handlePassword = (event) => {
    setPW(event.target.value);
    setPwError("");
  };

  return (
    <div className="sign-up-main-container">
      <h2>Sign Up</h2>
      <input
        className="input"
        placeholder="username"
        onChange={handleUserName}
      ></input>
      {userNameError && <div className="pw-user-error">{userNameError}</div>}
      <input
        className="input"
        placeholder="password"
        onChange={handlePassword}
      ></input>
      {pWError && <div className="pw-user-error">{pWError}</div>}
      <button className="log-in-button" onClick={handleSignUpBtn}>
        Sign Up
      </button>
      <p className="hover-link" onClick={handleHaveAccount}>
        I already have an account
      </p>
    </div>
  );
};

export default SignUp;
