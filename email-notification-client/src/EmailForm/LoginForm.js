import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useTokenStore } from "../App";
import { useLoginHandler } from "../config/userLogin";
import "./EmailForm.css";
import "./Popup.css";


function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const {loading, isAuthenticated, userPool, getAuthenticatedUser, signOut,setAuthenticated} = useLoginHandler("");
  const navigate = useNavigate()

  const [accessToken, setAccessToken, setUser] = useTokenStore(
    (state) => [state.accessToken, state.setAccessToken, state.setUser],shallow
    
  );


  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log("login success", result.getIdToken().getJwtToken());
        setAccessToken(result.getIdToken().getJwtToken());
        setUser(email)
        setAuthenticated()
        navigate('/app')
      },
      onFailure: (err) => {
        console.log("login failure", err);
        alert("login failure");
      },
      newPasswordRequired: (data) => {
        console.log("new password required", data);
        alert("new password required");
      },
    });
  };

  return (
    <div className="email-form">
      <div className="email-form-header">
        <h2>Email Notification Service</h2>
        <div className="email-form-buttons"></div>
      </div>
      <div className="email-form-body">
        <div className="email-form-input">
          <label htmlFor="Password-input">Email:</label>
          <input
            type="text"
            id="Password-input"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="email-form-input">
          <label htmlFor="emailCategory-input">Password:</label>
          <input
            type="password"
            id="emailCategory-input"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="email-form-footer">
          <button className="send-email-btn" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
