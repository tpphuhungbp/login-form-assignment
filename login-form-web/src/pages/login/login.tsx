import React, { useState } from "react";
import "./login.css";
import GoogleLogo from "./GoogleLogo.png";

export default function Login() {
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
      // Handle login logic here
      console.log("Email:", email);
      console.log("Username:", username);
      console.log("Password:", password);
      // You can add further login logic like API calls here
    }
  };
  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login clicked");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
          Login
        </button>
      </form>
      <p>or</p>
      <button onClick={handleGoogleLogin} className="google-button">
        <img src={GoogleLogo} className="google-logo" alt="logo" />
        Login with Google
      </button>
      <div className="signup-link-container">
        <p>
          Don't have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
