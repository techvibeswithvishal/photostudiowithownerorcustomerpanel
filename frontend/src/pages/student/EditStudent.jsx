import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase/firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    name: "",
    fatherName: "",
    studentClass: "",
    dob: "",
    mobile: "",
    address: "",
    other: ""
  });
  const [photo, setPhoto] = useState(null);
  const [attachment, setAttachment] = useState(null);
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

    let photoURL = student.photoURL || "";
    let attachmentURL = student.attachmentURL || "";

    if (photo) {
      const photoRef = ref(storage, `photos/${Date.now()}_${photo.name}`);
      await uploadBytes(photoRef, photo);
      photoURL = await getDownloadURL(photoRef);
    }

    if (attachment) {
      const attachRef = ref(storage, `attachments/${Date.now()}_${attachment.name}`);
      await uploadBytes(attachRef, attachment);
      attachmentURL = await getDownloadURL(attachRef);
    }

    await updateDoc(doc(db, "students", id), {
      ...student,
      photoURL,
      attachmentURL
    });

    navigate("/student/dashboard");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <input name="name" type="text" placeholder="Student's Name" value={student.name} onChange={handleChange} required />
        <input name="fatherName" type="text" placeholder="Father's Name" value={student.fatherName} onChange={handleChange} required />
        <input name="studentClass" type="text" placeholder="Class" value={student.studentClass} onChange={handleChange} required />
        <input name="dob" type="date" value={student.dob} onChange={handleChange} required />
        <input name="mobile" type="text" placeholder="Mobile No." value={student.mobile} onChange={handleChange} required />
        <textarea name="address" placeholder="Address" value={student.address} onChange={handleChange} required />
        <input name="other" type="text" placeholder="Other Info" value={student.other} onChange={handleChange} />

        <label>Upload Photo:</label>
        <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />

        <label>Upload Attachment (optional):</label>
        <input type="file" onChange={(e) => setAttachment(e.target.files[0])} />

        <button type="submit" style={{ marginTop: "1rem" }}>Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
