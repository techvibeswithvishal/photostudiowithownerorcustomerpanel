// src/pages/student/GoogleSheetView.jsx
import React, { useContext } from "react";
import { SchoolAuthContext } from "../../context/SchoolPanelAuthContext";

const GoogleSheetView = () => {
  const { schoolUser } = useContext(SchoolAuthContext);

  // Base Google Sheet URL
  const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
  const sheetUrl = sheetId
    ? `https://docs.google.com/spreadsheets/d/${sheetId}/edit?usp=sharing`
    : "";

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Student Data (Google Sheet)</h2>
      <p>
        Only showing students for <strong>{schoolUser?.name}</strong>.
        Please ensure your Google Sheet has a column <strong>schoolId</strong> 
        to identify which rows belong to this school.
      </p>
      {sheetUrl ? (
        <iframe
          src={sheetUrl}
          width="100%"
          height="600px"
          style={{ border: "1px solid #ccc" }}
          title="Google Sheet"
        ></iframe>
      ) : (
        <p>Google Sheet URL not set. Check your .env configuration.</p>
      )}
    </div>
  );
};

export default GoogleSheetView;
