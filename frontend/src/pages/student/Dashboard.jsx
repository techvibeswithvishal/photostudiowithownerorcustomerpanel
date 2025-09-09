import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.js";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

const Dashboard = ({ schoolId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const q = query(collection(db, "students"), where("schoolId", "==", schoolId));
      const snapshot = await getDocs(q);
      const studentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    };
    fetchStudents();
  }, [schoolId]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteDoc(doc(db, "students", id));
      setStudents(students.filter(student => student.id !== id));
    }
  };

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
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.fatherName}</td>
              <td>{student.studentClass}</td>
              <td>{student.dob}</td>
              <td>{student.mobile}</td>
              <td>{student.address}</td>
              <td>{student.photoURL && <img src={student.photoURL} alt="student" width="50" />}</td>
              <td>{student.attachmentURL && <a href={student.attachmentURL} target="_blank" rel="noreferrer">View</a>}</td>
              <td>
                <Link to={`/student/edit/${student.id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
