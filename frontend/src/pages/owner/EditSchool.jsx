import React, { useEffect, useState } from "react";
import axios from "axios";

const ListSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // current row being edited
  const [tempData, setTempData] = useState({}); // temp storage for edited fields

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("ownerToken");

  // Fetch all schools
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/owner/list-schools`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchools(res.data.schools);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, [backendUrl, token]);

  const handleEditClick = (school) => {
    setEditingId(school._id);
    setTempData({ schoolName: school.schoolName, loginId: school.loginId, password: school.password });
  };

  const handleCancel = () => {
    setEditingId(null);
    setTempData({});
  };

  const handleChange = (e, field) => {
    setTempData({ ...tempData, [field]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(
        `${backendUrl}/api/owner/school/${id}`,
        {
          name: tempData.schoolName,
          email: tempData.loginId,
          password: tempData.password,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setSchools(schools.map(s => s._id === id ? { ...s, ...tempData } : s));
        setEditingId(null);
        setTempData({});
        alert("✅ School updated successfully!");
      } else {
        alert(`❌ ${res.data.error || "Failed to update"}`);
      }
    } catch (err) {
      console.error(err);
      alert(`❌ ${err.response?.data?.error || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ Are you sure to delete this school?")) return;
    try {
      const res = await axios.delete(`${backendUrl}/api/owner/school/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setSchools(schools.filter(s => s._id !== id));
        alert("✅ School deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      alert(`❌ ${err.response?.data?.error || err.message}`);
    }
  };

  if (loading) return <p>Loading schools...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Schools</h2>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>School Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email/Login ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Password</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingId === school._id ? (
                  <input
                    type="text"
                    value={tempData.schoolName}
                    onChange={(e) => handleChange(e, "schoolName")}
                  />
                ) : (
                  school.schoolName
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingId === school._id ? (
                  <input
                    type="email"
                    value={tempData.loginId}
                    onChange={(e) => handleChange(e, "loginId")}
                  />
                ) : (
                  school.loginId
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingId === school._id ? (
                  <input
                    type="text"
                    value={tempData.password}
                    onChange={(e) => handleChange(e, "password")}
                  />
                ) : (
                  "••••••••"
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {editingId === school._id ? (
                  <>
                    <button onClick={() => handleUpdate(school._id)}>Update</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(school)}>Edit</button>
                    <button onClick={() => handleDelete(school._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSchools;
