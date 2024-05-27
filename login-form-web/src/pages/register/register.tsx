import React, { useState } from "react";
import "./register.css";
import GoogleLogo from "./GoogleLogo.png";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || username === "" || password === "") {
      setErrorMessage("Please fill in all fields.");
    } else {
      setErrorMessage("");
      // Handle register logic here
      console.log("Email:", email);
      console.log("Username:", username);
      console.log("Password:", password);
      // You can add further register logic like API calls here
    }
  };
  const handleGoogleLogin = () => {
    // Handle Google register logic here
    console.log("Google register clicked");
  };

  return (
    <div className="register-container">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-input"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="submit-button">
          Create account
        </button>
      </form>
      <button onClick={handleGoogleLogin} className="google-button">
        <img src={GoogleLogo} className="google-logo" alt="logo" />
        Authenticate with Google
      </button>
      <div className="signup-link-container">
        <a href="/login" className="signup-link">
          Back to log in
        </a>
      </div>
    </div>
  );
}
