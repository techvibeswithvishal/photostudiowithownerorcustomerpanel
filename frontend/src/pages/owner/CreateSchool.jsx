import React, { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../firebase/firebase"; // Make sure you export 'app' from your firebase.js

const CreateSchool = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");



  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const functions = getFunctions(app);
    const createSchool = httpsCallable(functions, "createSchoolAccount");

    // Generate password
    const password = Math.random().toString(36).slice(-8);

    // Call function
    const result = await createSchool({ name, email, password });

    setMessage(
      `✅ School Created! ID: ${result.data.schoolId}, Password: ${password}`
    );

    setName("");
    setEmail("");
  } catch (error) {
    if (error.code === "permission-denied") {
      setMessage("❌ You are not allowed to create schools (owner only).");
    } else if (error.code === "invalid-argument") {
      setMessage("❌ Missing school name or email.");
    } else {
      setMessage(`❌ Error: ${error.message}`);
    }
  }
};



  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Create School Account</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="School Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="School Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Create School</button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default CreateSchool;
