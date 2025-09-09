import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState({}); // Track which password is visible

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("ownerToken");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/owner/list-schools`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchools(res.data.schools); // Backend returns { schools: [...] }
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

  if (loading) return <p>Loading schools...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Schools</h2>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>School ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Password</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{school._id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{school.schoolName}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{school.loginId}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {showPassword[school._id] ? school.password : "••••••••"}
                <button
                  onClick={() => togglePassword(school._id)}
                  style={{
                    marginLeft: "8px",
                    padding: "2px 6px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  {showPassword[school._id] ? "Hide" : "Show"}
                </button>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <Link to={`/owner/edit-school/${school._id}`}>
                  <button
                    style={{
                      padding: "4px 8px",
                      cursor: "pointer",
                    }}
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
