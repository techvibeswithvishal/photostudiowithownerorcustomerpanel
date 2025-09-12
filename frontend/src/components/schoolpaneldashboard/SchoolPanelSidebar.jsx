// src/components/schoolpaneldashboard/SchoolpannelSidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SchoolpannelSidebar.css";

const SchoolpannelSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Menu</h3>
      <ul className="sidebar-list">
        {/* Go Back Home */}
        <li
          className="sidebar-item sidebar-home"
          onClick={() => navigate("/")}
        >
          ⬅ Go Back Home
        </li>

        {/* Divider 1: MongoDB */}
        <li className="sidebar-section">MongoDB</li>
        <li
          className={`sidebar-item ${activeTab === "mongodb-add" ? "active" : ""}`}
          onClick={() => setActiveTab("mongodb-add")}
        >
          Add Student
        </li>
        <li
          className={`sidebar-item ${activeTab === "mongodb-list" ? "active" : ""}`}
          onClick={() => setActiveTab("mongodb-list")}
        >
          Student List
        </li>

        <hr className="sidebar-divider" />

        {/* Divider 2: Drive */}
        <li className="sidebar-section">Alternative way (Drive)</li>
        <li
          className={`sidebar-item ${activeTab === "drive-form" ? "active" : ""}`}
          onClick={() => setActiveTab("drive-form")}
        >
          Add Student (Google Form)
        </li>
        <li
          className={`sidebar-item ${activeTab === "drive-sheet" ? "active" : ""}`}
          onClick={() => setActiveTab("drive-sheet")}
        >
          Student List (Google Sheet)
        </li>
        <hr className="sidebar-divider" />

        {/* Dashboard */}
        <li
          className={`sidebar-item ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </li>

        <hr className="sidebar-divider" />
      </ul>
    </div>
  );
};

export default SchoolpannelSidebar;
