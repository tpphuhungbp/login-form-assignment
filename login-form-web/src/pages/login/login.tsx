import React, { useState } from "react";
import "./login.css";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Please fill in all fields.");
    } else {
      setErrorMessage("");

      const response = await fetch("http://localhost:8000/api/v1/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);
        localStorage.setItem("accessToken", data.token);
        navigate("/home");
      } else {
        setErrorMessage(data.message);
      }
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
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleGoogleLogin(credentialResponse.credential);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
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
