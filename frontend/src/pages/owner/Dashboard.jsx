import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [totalSchools, setTotalSchools] = useState(0);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; 
  const token = localStorage.getItem("ownerToken"); 

  useEffect(() => {
    const fetchSchools = async () => {
      if (!token) return; 

      try {
        const res = await axios.get(`${backendUrl}/api/owner/list-schools`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalSchools(res.data.schools.length);
      } catch (error) {
        console.error("Error fetching schools:", error.response?.data?.message || error.message);
      }
    };

    fetchSchools();
  }, [backendUrl, token]);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        backgroundColor: "#f7f9fc",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Owner Dashboard</h2>
      <p
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "30px",
          color: "#555",
        }}
      >
        Total Schools Registered: <span style={{ color: "#4CAF50" }}>{totalSchools}</span>
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <Link to="/owner/create-school">
          <button
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007BFF",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0069d9")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Create New School
          </button>
        </Link>
        <Link to="/owner/list-schools">
          <button
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#28a745",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            View All Schools
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
