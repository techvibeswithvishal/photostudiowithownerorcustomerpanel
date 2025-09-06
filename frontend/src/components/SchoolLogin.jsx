import React, { useState } from "react";

const SchoolLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Connect Firebase Auth here
    if (email && password) {
      console.log("Login attempt:", email, password);
    } else {
      setError("Please enter email and password");
    }
  };

  return (
    <section style={{ padding: "2rem", backgroundColor: "#f2f2f2" }}>
      <h2>School Panel Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <input 
          type="email" 
          placeholder="School Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem", backgroundColor: "#333", color: "#fff", cursor: "pointer" }}>
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </section>
  );
};

export default SchoolLogin;
