import React, { useState, useContext } from "react";
import axios from "axios";
import { OwnerAuthContext } from "../../context/OwnerAuthContext"; 
import { useNavigate } from "react-router-dom";

const CreateSchool = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // owner-defined password
  const [message, setMessage] = useState("");

  const { user } = useContext(OwnerAuthContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user) {
      setMessage("❌ You must be logged in as owner to create a school.");
      return;
    }

    try {
      // Call backend API with owner-provided credentials
      const res = await axios.post(
        `${backendUrl}/api/owner/create-school`,
        { name, email, password }, // send what owner entered
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ownerToken")}`,
          },
        }
      );

      setMessage(`✅ School Created! ID: ${res.data.schoolId}`);

      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");

      // Optional: navigate to list schools
      // navigate("/owner/list-schools");

    } catch (error) {
      if (error.response) {
        setMessage(`❌ Error: ${error.response.data.error || error.response.data.message}`);
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
        <input
          type="password"
          placeholder="School Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create School</button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default CreateSchool;
