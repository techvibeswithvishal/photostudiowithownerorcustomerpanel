import React, { useEffect, useState } from "react";
import axios from "axios";

const ListSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [tempData, setTempData] = useState({});

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("ownerToken");

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

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "20px", fontWeight: "bold" }}>
        Loading schools...
      </p>
    );

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>All Schools</h2>
      <table style={{ borderCollapse: "collapse", width: "100%", backgroundColor: "white" }}>
        <thead>
          <tr style={{ background: "#007BFF", color: "white", fontWeight: "bold", textAlign: "left" }}>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>School Name</th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>Email/Login ID</th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>Password</th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr
              key={school._id}
              style={{ transition: "background-color 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f1f1f1")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {editingId === school._id ? (
                  <input
                    type="text"
                    value={tempData.schoolName}
                    onChange={(e) => handleChange(e, "schoolName")}
                    style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc", width: "90%" }}
                  />
                ) : (
                  school.schoolName
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {editingId === school._id ? (
                  <input
                    type="email"
                    value={tempData.loginId}
                    onChange={(e) => handleChange(e, "loginId")}
                    style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc", width: "90%" }}
                  />
                ) : (
                  school.loginId
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {editingId === school._id ? (
                  <input
                    type="text"
                    value={tempData.password}
                    onChange={(e) => handleChange(e, "password")}
                    style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc", width: "90%" }}
                  />
                ) : (
                  "••••••••"
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {editingId === school._id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(school._id)}
                      style={{
                        padding: "6px 12px",
                        marginRight: "6px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#28a745",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
                    >
                      Update
                    </button>
                    <button
                      onClick={handleCancel}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#dc3545",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(school)}
                      style={{
                        padding: "6px 12px",
                        marginRight: "6px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#007BFF",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#0069d9")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(school._id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: "#dc3545",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                    >
                      Delete
                    </button>
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
