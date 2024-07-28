import App from "./App";
import React, { useState, useEffect } from "react";

import SignUp from "./SignupPage";

function SignIn(props) {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const handleLogInBtn = async () => {
    if (!userName) {
      setUserNameError("Please enter your Username");
      return;
    }
    if (!password) {
      setPasswordError("Please enter your Password");
      return;
    }

    const response = await fetch("http://localhost:1001/login", {
      method: "POST",
      body: JSON.stringify({ username: userName, password: password }),
      headers: { "Content-Type": "application/json" },
    });

    const resObj = await response.json();
    if (resObj.status === "success") {
      props.loadPage("app");
    } else {
      setPasswordError("Incorrect username or password");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    setUserNameError("");
  };

  const handleSignUp = () => {
    props.loadPage("signUp");
  };

  return (
    <>
      <div className="log-in-main-container">
        <h2>Log in to quiz daily</h2>
        <input
          placeholder="Username"
          className="input"
          onChange={handleUserNameChange}
        ></input>
        {userNameError && <div className="pw-user-error">{userNameError}</div>}

        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={handlePasswordChange}
        ></input>
        {passwordError && <div className="pw-user-error">{passwordError}</div>}

        <button onClick={handleLogInBtn} className="log-in-button">
          Log In
        </button>
        <p onClick={handleSignUp} className="hover-link">
          Sign up here
        </p>
      </div>
    </>
  );
}

export default SignIn;
