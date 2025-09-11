import React, { useState, useContext } from "react";
import axios from "axios";
import { OwnerAuthContext } from "../../context/OwnerAuthContext"; 
import { useNavigate } from "react-router-dom";

const CreateSchool = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
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
      const res = await axios.post(
        `${backendUrl}/api/owner/create-school`,
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ownerToken")}`,
          },
        }
      );

      setMessage(`✅ School Created! ID: ${res.data.schoolId}`);

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      if (error.response) {
        setMessage(`❌ Error: ${error.response.data.error || error.response.data.message}`);
      } else {
        setMessage(`❌ Error: ${error.message}`);
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        backgroundColor: "#f9f9f9",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Create School Account
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          placeholder="School Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <input
          type="email"
          placeholder="School Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <input
          type="password"
          placeholder="School Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Create School
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "15px",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: message.startsWith("✅") ? "#d4edda" : "#f8d7da",
            color: message.startsWith("✅") ? "#155724" : "#721c24",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateSchool;
