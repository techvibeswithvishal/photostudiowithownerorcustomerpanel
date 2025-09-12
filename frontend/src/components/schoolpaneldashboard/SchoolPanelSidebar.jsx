import React, { useState } from "react";
import SchoolPanelSidebar from "../../components/schoolpaneldashboard/SchoolPanelSidebar.jsx";
import SchoolPanelNavbar from "../../components/schoolpaneldashboard/SchoolPanelNavbar.jsx";

import Dashboard from "./Dashboard";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import StudentList from "./StudentList";
import GoogleFormLink from "../drive/GoogleFormLink";
import GoogleSheetView from "../drive/GoogleSheetView";

const StudentPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editStudentId, setEditStudentId] = useState(null);

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "mongodb-add":
        return <AddStudent setEditStudentId={setEditStudentId} />;
      case "mongodb-list":
        return <StudentList setEditStudentId={setEditStudentId} />;
      case "edit-student":
        return <EditStudent studentId={editStudentId} />;
      case "drive-form":
        return <GoogleFormLink />;
      case "drive-sheet":
        return <GoogleSheetView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <SchoolPanelSidebar activeTab={activeTab} setActiveTab={setActiveTab} /> {/* ✅ Correct spelling */}
      <div style={{ flex: 1 }}>
        <SchoolPanelNavbar /> {/* ✅ Correct spelling */}
        <div style={{ padding: "2rem" }}>{renderTab()}</div>
      </div>
    </div>
  );
};

export default StudentPanel;
