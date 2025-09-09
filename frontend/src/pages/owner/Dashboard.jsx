import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [totalSchools, setTotalSchools] = useState(0);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // backend URL from .env
  const token = localStorage.getItem("ownerToken"); // JWT from owner login

  useEffect(() => {
    const fetchSchools = async () => {
      if (!token) return; // prevent request if no token

      try {
        const res = await axios.get(`${backendUrl}/api/owner/list-schools`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // res.data.schools should be an array of school objects
        setTotalSchools(res.data.schools.length);
      } catch (error) {
        console.error("Error fetching schools:", error.response?.data?.message || error.message);
      }
    };

    fetchSchools();
  }, [backendUrl, token]);

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Owner Dashboard</h2>
      <p>Total Schools Registered: {totalSchools}</p>
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <Link to="/owner/create-school">
          <button>Create New School</button>
        </Link>
        <Link to="/owner/list-schools">
          <button>View All Schools</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
