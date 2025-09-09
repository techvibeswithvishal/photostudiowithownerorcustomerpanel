import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("schoolToken"); // JWT from school login

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/student/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setStudents(res.data.students);
        } else {
          console.error("Failed to fetch students:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching students:", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [backendUrl, token]);

  // Delete a student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const res = await axios.delete(`${backendUrl}/api/student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setStudents(students.filter((s) => s._id !== id));
      } else {
        alert(res.data.message || "Failed to delete student");
      }
    } catch (err) {
      console.error("Error deleting student:", err.response?.data?.message || err.message);
      alert("Error deleting student. Check console.");
    }
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>School Dashboard</h2>
      <Link to="/student/add">
        <button>Add Student</button>
      </Link>
      <table border="1" cellPadding="10" style={{ marginTop: "1rem", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Father's Name</th>
            <th>Class</th>
            <th>DOB</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Photo</th>
            <th>Attachment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>No students found</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentName}</td>
                <td>{student.fatherName}</td>
                <td>{student.className}</td>
                <td>{student.dob}</td>
                <td>{student.mobile}</td>
                <td>{student.address}</td>
                <td>
                  {student.photo && <img src={student.photo} alt="student" width="50" />}
                </td>
                <td>
                  {student.attachments && (
                    <a href={student.attachments} target="_blank" rel="noreferrer">
                      View
                    </a>
                  )}
                </td>
                <td>
                  <Link to={`/student/edit/${student._id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(student._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
