import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SchoolAuthContext } from "../../context/SchoolPanelAuthContext";

const AddStudent = () => {
  const { schoolUser } = useContext(SchoolAuthContext);
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
  const [attachments, setAttachments] = useState(null);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("schoolToken");

  const handleChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!schoolUser) return alert("School not logged in.");

    try {
      const formData = new FormData();
      formData.append("studentName", student.studentName);
      formData.append("fatherName", student.fatherName);
      formData.append("className", student.className);
      formData.append("dob", student.dob);
      formData.append("mobile", student.mobile);
      formData.append("address", student.address);
      formData.append("other", student.other);

      if (photo) formData.append("photo", photo);
      if (attachments) formData.append("attachments", attachments); // match backend

      await axios.post(`${backendUrl}/api/student/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/student/dashboard");
    } catch (err) {
      console.error(
        "❌ Error adding student:",
        err.response?.data?.message || err.message
      );
      alert("❌ Failed to add student. Check console.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add Student</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
      >
        <input
          name="studentName"
          placeholder="Student's Name"
          value={student.studentName}
          onChange={handleChange}
          required
        />
        <input
          name="fatherName"
          placeholder="Father's Name"
          value={student.fatherName}
          onChange={handleChange}
          required
        />
        <input
          name="className"
          placeholder="Class"
          value={student.className}
          onChange={handleChange}
          required
        />
        <input
          name="dob"
          type="date"
          value={student.dob}
          onChange={handleChange}
          required
        />
        <input
          name="mobile"
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
          placeholder="Other Info"
          value={student.other}
          onChange={handleChange}
        />

        <label>Upload Photo:</label>
        <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />

        <label>Upload Attachment (optional):</label>
        <input type="file" onChange={(e) => setAttachments(e.target.files[0])} />

        <button type="submit" style={{ marginTop: "1rem" }}>
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
