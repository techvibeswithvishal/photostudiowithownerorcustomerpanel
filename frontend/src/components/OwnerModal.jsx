// src/components/OwnerModal.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OwnerAuthContext } from "../context/OwnerAuthContext";

const OwnerModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login, logout, user } = useContext(OwnerAuthContext); // ✅ use context

  // Owner login via context
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(email, password); // ✅ use context login
      if (!res.success) {
        setError(res.error);
        return;
      }
      navigate("/owner/dashboard"); // redirect after login
      onClose(); // close modal
    } catch (err) {
      setError(err.message || "Failed to login.");
    }
  };

  // Logout owner
  const handleLogout = async () => {
    await logout(); // ✅ use context logout
    navigate("/"); // redirect to home
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ width: "400px", background: "#fff", padding: 20, borderRadius: 8 }}>
        <button onClick={onClose} style={{ float: "right" }}>
          Close
        </button>

        {!user ? (
          <>
            <h3>Owner Sign In</h3>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
              <input
                type="email"
                placeholder="Owner Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ marginBottom: 10 }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ marginBottom: 10 }}
              />
              <button type="submit">Sign In</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </>
        ) : (
          <>
            <h3>Owner Panel</h3>
            <button onClick={handleLogout} style={{ marginBottom: 10 }}>
              Logout
            </button>
            <p>Redirecting to Owner Dashboard...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OwnerModal;
