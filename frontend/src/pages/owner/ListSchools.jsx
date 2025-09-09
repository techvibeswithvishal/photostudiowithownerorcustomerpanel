import React, { useEffect, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../../firebase/firebase";
import { Link } from "react-router-dom";

const ListSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const functions = getFunctions(app);
        const listSchools = httpsCallable(functions, "listSchools");
        const result = await listSchools();
        setSchools(result.data.schools);
      } catch (error) {
        console.error("Error fetching schools:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  if (loading) return <p>Loading schools...</p>;

  return (
    <div>
      <h2>All Schools</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>School ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school.id}>
              <td>{school.id}</td>
              <td>{school.name}</td>
              <td>{school.email}</td>
              <td>
                <Link to={`/owner/edit-school/${school.id}`}>
                  <button>Edit</button>
                </Link>
                {/* You can add delete functionality later */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSchools;
