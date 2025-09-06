import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({ name: "", rollNo: "", class: "", contact: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStudent(docSnap.data());
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "students", id);
    await updateDoc(docRef, student);
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <input name="name" type="text" placeholder="Name" value={student.name} onChange={handleChange} required />
        <input name="rollNo" type="text" placeholder="Roll No" value={student.rollNo} onChange={handleChange} required />
        <input name="class" type="text" placeholder="Class" value={student.class} onChange={handleChange} required />
        <input name="contact" type="text" placeholder="Contact" value={student.contact} onChange={handleChange} required />
        <button type="submit" style={{ marginTop: "1rem" }}>Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
