// src/pages/student/ListStudents.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // current student being edited
  const [tempData, setTempData] = useState({});
  const [photoFiles, setPhotoFiles] = useState({});
  const [attachmentFiles, setAttachmentFiles] = useState({});

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("schoolToken");

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/school/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setStudents(res.data.students);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [backendUrl, token]);

  const handleEditClick = (student) => {
    setEditingId(student._id);
    setTempData({
      studentName: student.name,
      fatherName: student.fatherName,
      className: student.class,
      dob: student.dob?.split("T")[0],
      mobile: student.mobile,
      address: student.address,
      other: student.other,
    });
    setPhotoFiles({});
    setAttachmentFiles({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setTempData({});
    setPhotoFiles({});
    setAttachmentFiles({});
  };

  const handleChange = (e, field) => {
    setTempData({ ...tempData, [field]: e.target.value });
  };

  const handlePhotoChange = (e, id) => {
    setPhotoFiles({ ...photoFiles, [id]: e.target.files[0] });
  };

  const handleAttachmentsChange = (e, id) => {
    setAttachmentFiles({ ...attachmentFiles, [id]: e.target.files });
  };

  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();

      Object.keys(tempData).forEach((key) => formData.append(key, tempData[key]));

      if (photoFiles[id]) formData.append("photoUrl", photoFiles[id]);
      if (attachmentFiles[id] && attachmentFiles[id].length > 0) {
        Array.from(attachmentFiles[id]).forEach((file) =>
          formData.append("attachments", file)
        );
      }

      const res = await axios.put(`${backendUrl}/api/school/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setStudents(
          students.map((s) =>
            s._id === id
              ? { ...s, ...tempData, photoUrl: res.data.student.photoUrl, attachments: res.data.student.attachments }
              : s
          )
        );
        handleCancel();
        alert("✅ Student updated successfully!");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update student");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const res = await axios.delete(`${backendUrl}/api/school/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setStudents(students.filter((s) => s._id !== id));
        alert("🗑️ Student deleted successfully");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Students</h2>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th>Name</th>
            <th>Father Name</th>
            <th>Class</th>
            <th>DOB</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Other</th>
            <th>Photo</th>
            <th>Attachments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>
                {editingId === s._id ? (
                  <input
                    type="text"
                    value={tempData.studentName}
                    onChange={(e) => handleChange(e, "studentName")}
                  />
                ) : (
                  s.name
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  <input
                    type="text"
                    value={tempData.fatherName}
                    onChange={(e) => handleChange(e, "fatherName")}
                  />
                ) : (
                  s.fatherName
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  <input
                    type="text"
                    value={tempData.className}
                    onChange={(e) => handleChange(e, "className")}
                  />
                ) : (
                  s.class
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  <input
                    type="date"
                    value={tempData.dob}
                    onChange={(e) => handleChange(e, "dob")}
                  />
                ) : (
                  s.dob?.split("T")[0]
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  <input
                    type="text"
                    value={tempData.mobile}
                    onChange={(e) => handleChange(e, "mobile")}
                  />
                ) : (
                  s.mobile
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  <input
                    type="text"
                    value={tempData.address}
                    onChange={(e) => handleChange(e, "address")}
                  />
                ) : (
                  s.address
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  <input
                    type="text"
                    value={tempData.other}
                    onChange={(e) => handleChange(e, "other")}
                  />
                ) : (
                  s.other
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  <>
                    <input type="file" accept="image/*" onChange={(e) => handlePhotoChange(e, s._id)} />
                    {photoFiles[s._id] ? (
                      <img
                        src={URL.createObjectURL(photoFiles[s._id])}
                        alt="Preview"
                        width="50"
                      />
                    ) : (
                      s.photoUrl && <img src={s.photoUrl} alt="Current" width="50" />
                    )}
                  </>
                ) : (
                  s.photoUrl && <img src={s.photoUrl} alt={s.name} width="50" />
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  <>
                    <input type="file" multiple onChange={(e) => handleAttachmentsChange(e, s._id)} />
                    {attachmentFiles[s._id]?.length > 0
                      ? `${attachmentFiles[s._id].length} new file(s)`
                      : s.attachments?.length > 0
                      ? `${s.attachments.length} existing attachment(s)`
                      : "No attachments"}
                  </>
                ) : s.attachments?.length > 0 ? (
                  `${s.attachments.length} file(s)`
                ) : (
                  "No attachments"
                )}
              </td>
              <td>
                {editingId === s._id ? (
                  <>
                    <button onClick={() => handleUpdate(s._id)}>Update</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(s)}>Edit</button>
                    <button onClick={() => handleDelete(s._id)}>Delete</button>
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

export default ListStudents;
