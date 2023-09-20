import axios from "axios";
import React, { useState } from "react";
import "./registrarUsuarioForm.scss";
import { useMarketplace } from "../../context";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password) => password.length >= 6;

export const RegistrarUsuarioForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const { setShowLogin } = useMarketplace();

  const handleShowLogin = () => {
    setShowLogin(true);
    handleClearFields();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    const errors = {};

    if (!email) {
      errors.email = true;
    } else if (!validateEmail(email)) {
      errors.email = true;
    }

    if (!password) {
      errors.password = true;
    } else if (!validatePassword(password)) {
      errors.password = true;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = true;
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://localhost:3000/user/", {
          fullname: formData.name,
          email:formData.email,
          password:formData.password,
        });

        const { newUser, token } = response.data;

        console.log("Registration successful:", newUser);
        
        // Guardar el token en localStorage
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };

  const handleClearFields = () => {
    setFormData(initialState);
    setFormErrors({});
  };

  const { email, password, confirmPassword } = formData;

  return (
    <div className="register">
      <form className="register-form">
        <p className="title-form">REGISTER</p>
        <div className={`input-container ${formErrors.email ? "error" : ""}`}>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <span className="error-message">Invalid email format</span>
          )}
        </div>
        <div className={`input-container ${formErrors.password ? "error" : ""}`}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          {formErrors.password && (
            <span className="error-message">
              Password must be at least 6 characters
            </span>
          )}
        </div>
        <div className={`input-container ${formErrors.confirmPassword ? "error" : ""}`}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
          />
          {formErrors.confirmPassword && (
            <span className="error-message">Passwords do not match</span>
          )}
        </div>
        <div className="input-container">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="btn-container">
          <button onClick={handleSubmit} className="register-btn" />
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
