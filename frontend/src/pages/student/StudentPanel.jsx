import React, { useState } from "react";
import SchoolpannelSidebar from "../../components/schoolpaneldashboard/SchoolpannelSidebar.jsx";

import SchoolpannelNavbar from "../../components/schoolpaneldashboard/SchoolpannelNavbar.jsx";

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

      case "mongodb-add": // Add Student tab
        return <AddStudent setEditStudentId={setEditStudentId} />;

      case "mongodb-list": // Student List tab
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
      <SchoolpannelSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ flex: 1 }}>
        <SchoolpannelNavbar />
        <div style={{ padding: "2rem" }}>{renderTab()}</div>
      </div>
    </div>
  );
};

export default StudentPanel;
