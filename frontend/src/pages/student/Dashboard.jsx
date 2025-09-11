import React from "react";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const schoolName = localStorage.getItem("schoolName") || "Your School";

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to {schoolName} Dashboard!</h1>
      <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
        Manage students, view reports, and keep track of all school activities.
      </p>

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <Link to="/student/add">
          <button style={{ padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer" }}>
            ➕ Add Student
          </button>
        </Link>

        <Link to="/student/list">
          <button style={{ padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer" }}>
            📋 View Students
          </button>
        </Link>

  

      </div>

      <div style={{ marginTop: "3rem" }}>
        
      </div>
    </div>
  );
};

export default Dashboard;
