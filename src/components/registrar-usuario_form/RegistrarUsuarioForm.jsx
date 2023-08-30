import axios from "axios";
import React from "react";
import "./registrarUsuarioForm.scss";
import { useState } from "react";
import { useMarketplace } from "../../context";

export const RegistrarUsuarioForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setShowLogin } = useMarketplace();

  //modifica el estado del contexto global
  const handleShowLogin = () => {
    setShowLogin(true);
    handleClearFields();
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
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
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleClearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setEmailError(false);
    setPasswordError(false);
  };

  return (
    <div className="register">
      <form className="register-form">
        <p className="title-form">REGISTER</p>
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
        <div className="input-container">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="btn-container">
          <button onClick={handleRegister} className="register-btn" />
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
          Show Login
        </button>
      </form>
    </div>
  );
};
