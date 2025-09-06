import React, { useState } from "react";
import { db } from "../firebase/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddStudent = ({ schoolId }) => {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "students"), {
      schoolId,
      name,
      rollNo,
      class: studentClass,
      contact
    });
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="text" placeholder="Roll No" value={rollNo} onChange={e => setRollNo(e.target.value)} required />
        <input type="text" placeholder="Class" value={studentClass} onChange={e => setStudentClass(e.target.value)} required />
        <input type="text" placeholder="Contact" value={contact} onChange={e => setContact(e.target.value)} required />
        <button type="submit" style={{ marginTop: "1rem" }}>Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
