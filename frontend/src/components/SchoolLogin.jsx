import React, { useState } from "react";


const SchoolLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log("Login attempt:", email, password);
      setError("");
    } else {
      setError("Please enter email and password");
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
