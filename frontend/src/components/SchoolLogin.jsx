import React, { useState, useContext } from "react";
import { SchoolAuthContext } from "../context/SchoolPanelAuthContext";
import { useNavigate } from "react-router-dom";

const SchoolLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(SchoolAuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      await login(email, password); // Uses SchoolAuthContext login
      navigate("/student/dashboard"); // Redirect to student dashboard after login
    } catch (err) {
      setError(err.message || "Failed to login. Check credentials.");
    }
  };

  return (
    <div className="school-login-wrapper">
      <div className="school-login-card">
        <h2>School Panel Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="School Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SchoolLogin;
