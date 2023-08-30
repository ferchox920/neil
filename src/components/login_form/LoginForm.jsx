import axios from "axios";
import React from "react";
import "./loginForm.scss";
import { useState } from "react";
import { useMarketplace } from "../../context";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setShowLogin } = useMarketplace(); // usa el contexto global

  //modifica el estado del contexto global
  const handleShowLogin = () => {
    setShowLogin(false);
    handleClearFields();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      return;
    }

    if (password.length < 6) {
      setPasswordError(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleClearFields = () => {
    setEmail("");
    setPassword("");
    setEmailError(false);
    setPasswordError(false);
  };

  return (
    <div className="login">
      <form className="login-form">
        <p className="title-form">LOGIN</p>
        <div className={`input-container ${emailError ? "error" : ""}`}>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
          />
          {emailError && (
            <span className="error-message">Invalid email format</span>
          )}
        </div>
        <div className={`input-container ${passwordError ? "error" : ""}`}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
          />
          {passwordError && (
            <span className="error-message">
              Password must be at least 6 characters
            </span>
          )}
        </div>
        <div className="btn-container">
          <button onClick={handleLogin} className="login-btn" />
          <button
            type="button"
            onClick={handleClearFields}
            className="clear-btn"
          />
        </div>
        <button
          type="button"
          onClick={handleShowLogin}
          className="show-login-btn"
        >
          Show Register
        </button>
      </form>
    </div>
  );
};
