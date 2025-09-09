import React, { useState } from "react";
import { useOwnerAuth } from "../context/OwnerAuthContext"; // use hook
import { useNavigate } from "react-router-dom"; // for redirect
import "../styles/Navbar.css";

const OwnerModal = ({ onClose }) => {
  const { login } = useOwnerAuth();
  const navigate = useNavigate(); // navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await login(email, password);

    if (res.success) {
      onClose(); // close modal
      navigate("/owner/dashboard"); // redirect to dashboard
    } else {
      setError(res.error); // show invalid credentials error
    }
  };

  return (
    <div className="owner-login-overlay">
      <div className="owner-login-box">
        <h2>Owner Login</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <button onClick={handleLogin}>Sign In</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default OwnerModal;
