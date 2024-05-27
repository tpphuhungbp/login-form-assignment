import React, { useState } from "react";
import "./register.css";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (email === "" || username === "" || password === "") {
        setErrorMessage("Please fill in all fields.");
      } else {
        setErrorMessage("");

        const response = await fetch("http://localhost:8000/api/v1/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, username: username, password: password }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Sign up successful", data);
          localStorage.setItem("accessToken", data.token);
          navigate("/home");
        } else {
          setErrorMessage(data.message);
        }
      }
    } catch (err) {
      throw err;
    }
  };
  const handleGoogleLogin = async (token: string | undefined) => {
    const response = await fetch("http://localhost:8000/api/v1/auth/signin-google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: token }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Signin successful", data);
      localStorage.setItem("accessToken", data.token);
      navigate("/home");
    } else {
      setErrorMessage(data.message);
    }
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
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleGoogleLogin(credentialResponse.credential);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </form>
      <div className="signup-link-container">
        <a href="/login" className="signup-link">
          Back to log in
        </a>
      </div>
    </div>
  );
}
