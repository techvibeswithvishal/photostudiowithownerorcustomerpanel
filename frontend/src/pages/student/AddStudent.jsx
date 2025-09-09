import React, { useState, useContext } from "react";
import { db, storage } from "../../firebase/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { SchoolAuthContext } from "../../context/SchoolPanelAuthContext";

const AddStudent = () => {
  const { schoolUser } = useContext(SchoolAuthContext);
  const [student, setStudent] = useState({ name: "", fatherName: "", studentClass: "", dob: "", mobile: "", address: "", other: "" });
  const [photo, setPhoto] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setStudent({ ...student, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!schoolUser) return alert("School not logged in.");

    let photoURL = "";
    let attachmentURL = "";

    if (photo) {
      const photoRef = ref(storage, `photos/${schoolUser.uid}_${Date.now()}_${photo.name}`);
      await uploadBytes(photoRef, photo);
      photoURL = await getDownloadURL(photoRef);
    }

    if (attachment) {
      const attachRef = ref(storage, `attachments/${schoolUser.uid}_${Date.now()}_${attachment.name}`);
      await uploadBytes(attachRef, attachment);
      attachmentURL = await getDownloadURL(attachRef);
    }

    await addDoc(collection(db, "students"), {
      schoolId: schoolUser.uid,
      ...student,
      photoURL,
      attachmentURL,
      createdAt: serverTimestamp(),
    });

    navigate("/student/dashboard");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <input name="name" placeholder="Student's Name" value={student.name} onChange={handleChange} required />
        <input name="fatherName" placeholder="Father's Name" value={student.fatherName} onChange={handleChange} required />
        <input name="studentClass" placeholder="Class" value={student.studentClass} onChange={handleChange} required />
        <input name="dob" type="date" value={student.dob} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile No." value={student.mobile} onChange={handleChange} required />
        <textarea name="address" placeholder="Address" value={student.address} onChange={handleChange} required />
        <input name="other" placeholder="Other Info" value={student.other} onChange={handleChange} />

        <label>Upload Photo:</label>
        <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />

        <label>Upload Attachment (optional):</label>
        <input type="file" onChange={(e) => setAttachment(e.target.files[0])} />

        <button type="submit" style={{ marginTop: "1rem" }}>Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
