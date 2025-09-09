import React, { useEffect, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../firebase/firebase";

const Dashboard = () => {
  const [totalSchools, setTotalSchools] = useState(0);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const functions = getFunctions(app);
        const listSchools = httpsCallable(functions, "listSchools");
        const result = await listSchools();
        setTotalSchools(result.data.schools.length);
      } catch (error) {
        console.error("Error fetching schools:", error.message);
      }
    };
    fetchSchools();
  }, []);

  return (
    <div>
      <h2>Owner Dashboard</h2>
      <p>Total Schools Registered: {totalSchools}</p>
      <div>
        <a href="/owner/create-school">
          <button>Create New School</button>
        </a>
        <a href="/owner/list-schools">
          <button>View All Schools</button>
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
