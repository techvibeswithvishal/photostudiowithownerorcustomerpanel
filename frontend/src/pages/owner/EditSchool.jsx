import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../../firebase/firebase";

const EditSchool = () => {
  const { id } = useParams();
  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const db = getFirestore(app);

  useEffect(() => {
    const fetchSchool = async () => {
      const docRef = doc(db, "schools", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSchoolName(data.name || data.schoolName);
        setEmail(data.email);
      } else {
        setMessage("School not found");
      }
    };
    fetchSchool();
  }, [id, db]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "schools", id);
      await updateDoc(docRef, { name: schoolName, email });
      setMessage("✅ School updated successfully!");
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Edit School</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Update School</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditSchool;
