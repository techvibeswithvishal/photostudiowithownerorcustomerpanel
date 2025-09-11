import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState({});

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("ownerToken");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/owner/list-schools`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchools(res.data.schools);
      } catch (err) {
        console.error("Error fetching schools:", err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [backendUrl, token]);

  const togglePassword = (id) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "20px", fontWeight: "bold" }}>
        Loading schools...
      </p>
    );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        All Schools
      </h2>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#007BFF",
              color: "white",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>School ID</th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>Password</th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr
              key={school._id}
              style={{
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f1f1f1")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{school._id}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{school.schoolName}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{school.loginId}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {showPassword[school._id] ? school.password : "••••••••"}
                <button
                  onClick={() => togglePassword(school._id)}
                  style={{
                    marginLeft: "8px",
                    padding: "3px 8px",
                    fontSize: "12px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    backgroundColor: "#f0f0f0",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                >
                  {showPassword[school._id] ? "Hide" : "Show"}
                </button>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                <Link to={`/owner/edit-school/${school._id}`}>
                  <button
                    style={{
                      padding: "6px 12px",
                      cursor: "pointer",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#28a745",
                      color: "white",
                      fontWeight: "bold",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
                  >
                    Edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSchools;
