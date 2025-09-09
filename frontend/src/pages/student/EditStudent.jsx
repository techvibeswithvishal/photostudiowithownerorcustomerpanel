import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    studentName: "",
    fatherName: "",
    className: "",
    dob: "",
    mobile: "",
    address: "",
    other: "",
  });
  const [photo, setPhoto] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("schoolToken");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/student/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
        setMessage("Failed to load student data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id, backendUrl, token]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in student) formData.append(key, student[key]);
      if (photo) formData.append("photo", photo);
      if (attachment) formData.append("attachments", attachment); // match backend field

      await axios.put(`${backendUrl}/api/student/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/student/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      setMessage("Failed to update student.");
    }
  };

  if (loading) return <p>Loading student data...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Student</h2>
      {message && <p>{message}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
      >
        <input
          name="studentName"
          type="text"
          placeholder="Student's Name"
          value={student.studentName}
          onChange={handleChange}
          required
        />
        <input
          name="fatherName"
          type="text"
          placeholder="Father's Name"
          value={student.fatherName}
          onChange={handleChange}
          required
        />
        <input
          name="className"
          type="text"
          placeholder="Class"
          value={student.className}
          onChange={handleChange}
          required
        />
        <input name="dob" type="date" value={student.dob} onChange={handleChange} required />
        <input
          name="mobile"
          type="text"
          placeholder="Mobile No."
          value={student.mobile}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={student.address}
          onChange={handleChange}
          required
        />
        <input
          name="other"
          type="text"
          placeholder="Other Info"
          value={student.other}
          onChange={handleChange}
        />

        <label>Upload Photo:</label>
        <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />

        <label>Upload Attachment (optional):</label>
        <input type="file" onChange={(e) => setAttachment(e.target.files[0])} />

        <button type="submit" style={{ marginTop: "1rem" }}>
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
