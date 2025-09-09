import React, { useState } from "react";
import SchoolpannelSidebar from "../../components/schoolpaneldashboard/SchoolpannelSidebar";

import SchoolpannelNavbar from "../../components/schoolpaneldashboard/SchoolpannelNavbar";

import Dashboard from "./Dashboard";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import GoogleFormLink from "../drive/GoogleFormLink";
import GoogleSheetView from "../drive/GoogleSheetView";

const StudentPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;

      // Drive section
      case "drive-form":
        return <GoogleFormLink />;
      case "drive-sheet":
        return <GoogleSheetView />;

      // MongoDB student management
      case "add-student":
        return <AddStudent />;
      case "edit-student":
        return <EditStudent />;

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
