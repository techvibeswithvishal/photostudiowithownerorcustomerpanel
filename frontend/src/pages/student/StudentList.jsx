import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [tempData, setTempData] = useState({});
  const [tempPhoto, setTempPhoto] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("schoolToken");

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/student/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setStudents(res.data.students);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Inline Edit
  const handleEditClick = (student) => {
    setEditingId(student._id);
    setTempData({
      studentName: student.name,
      fatherName: student.fatherName,
      className: student.class,
      dob: student.dob?.split("T")[0] || "",
      mobile: student.mobile,
      address: student.address,
      other: student.other,
    });
    setTempPhoto(null);
  };

  const handleTempChange = (e, field) => {
    setTempData({ ...tempData, [field]: e.target.value });
  };

  const handleCancel = () => {
    setEditingId(null);
    setTempData({});
    setTempPhoto(null);
  };

  const handleUpdate = async (id) => {
    const formData = new FormData();
    Object.keys(tempData).forEach((key) => formData.append(key, tempData[key]));
    if (tempPhoto) formData.append("photoUrl", tempPhoto);

    try {
      const res = await axios.put(`${backendUrl}/api/student/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        setStudents(students.map((s) =>
          s._id === id ? { ...s, ...tempData, photoUrl: tempPhoto ? URL.createObjectURL(tempPhoto) : s.photoUrl } : s
        ));
        handleCancel();
        alert("✅ Student updated successfully!");
      }
    } catch (err) {
      console.error("❌ Error updating student:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Failed to update student");
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`${backendUrl}/api/student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(students.filter((s) => s._id !== id));
      alert("🗑️ Student deleted successfully");
    } catch (err) {
      console.error("❌ Error deleting student:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };

  // Photo download
  const handleDownloadPhoto = async (photoUrl, name) => {
    if (!photoUrl) return;
    try {
      const response = await axios.get(photoUrl, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading photo:", err);
      alert("Failed to download photo");
    }
  };

  // Convert image URL to Base64
  const getImageBase64 = async (url) => {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const bytes = new Uint8Array(response.data);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      return btoa(binary);
    } catch (err) {
      console.error("❌ Error converting image to Base64:", err);
      return null;
    }
  };

  // Download Excel
  const downloadXLSX = async () => {
    if (!students.length) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");

    worksheet.columns = [
      { header: "Sr No", key: "sr", width: 6 },
      { header: "Name", key: "name", width: 20 },
      { header: "Father Name", key: "father", width: 20 },
      { header: "Class", key: "class", width: 10 },
      { header: "DOB", key: "dob", width: 12 },
      { header: "Mobile", key: "mobile", width: 15 },
      { header: "Address", key: "address", width: 30 },
      { header: "Other", key: "other", width: 20 },
      { header: "Photo", key: "photo", width: 15 },
    ];

    for (let i = 0; i < students.length; i++) {
      const s = students[i];
      const row = worksheet.addRow({
        sr: i + 1,
        name: s.name,
        father: s.fatherName,
        class: s.class,
        dob: s.dob?.split("T")[0] || "",
        mobile: s.mobile,
        address: s.address,
        other: s.other,
      });

      if (s.photoUrl) {
        const base64 = await getImageBase64(s.photoUrl);
        if (base64) {
          const imageId = workbook.addImage({ base64, extension: "png" });
          worksheet.addImage(imageId, { tl: { col: 8, row: row.number - 1 }, ext: { width: 50, height: 50 } });
        }
      }
    }

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "student_list.xlsx");
  };

  // Download ZIP
  const handleDownloadFolder = async () => {
    if (!students.length) return;

    const zip = new JSZip();
    const tableFolder = zip.folder("table");
    const photosFolder = zip.folder("photos");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");
    worksheet.columns = [
      { header: "Sr No", key: "sr", width: 6 },
      { header: "Name", key: "name", width: 20 },
      { header: "Father Name", key: "father", width: 20 },
      { header: "Class", key: "class", width: 10 },
      { header: "DOB", key: "dob", width: 12 },
      { header: "Mobile", key: "mobile", width: 15 },
      { header: "Address", key: "address", width: 30 },
      { header: "Other", key: "other", width: 20 },
    ];

    students.forEach((s, i) => {
      worksheet.addRow({
        sr: i + 1,
        name: s.name,
        father: s.fatherName,
        class: s.class,
        dob: s.dob?.split("T")[0] || "",
        mobile: s.mobile,
        address: s.address,
        other: s.other,
      });
    });

    const excelBuffer = await workbook.xlsx.writeBuffer();
    tableFolder.file("students.xlsx", excelBuffer);

    for (let i = 0; i < students.length; i++) {
      const s = students[i];
      if (!s.photoUrl) continue;
      try {
        const response = await axios.get(s.photoUrl, { responseType: "arraybuffer" });
        const ext = s.photoUrl.split(".").pop().split("?")[0];
        photosFolder.file(`${i + 1}_${s.name}.${ext}`, response.data);
      } catch (err) {
        console.error("Photo failed:", s.name, err);
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "students_folder.zip");
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading students...</p>;

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Student List</h2>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={downloadXLSX} style={primaryBtnStyle}>📥 Download Excel</button>
        <button onClick={handleDownloadFolder} style={{ ...primaryBtnStyle, marginLeft: "10px" }}>📂 Download Folder</button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr style={theadStyle}>
              {["Sr No.", "Name", "Father Name", "Class", "DOB", "Mobile", "Address", "Other", "Photo", "Attachments", "Edit", "Delete"].map((h, i) => (
                <th key={i} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr><td colSpan="12" style={{ textAlign: "center", padding: "1rem" }}>No students found</td></tr>
            ) : (
              students.map((s, i) => (
                <tr key={s._id} style={i % 2 === 0 ? trEvenStyle : trOddStyle}>
                  <td style={tdStyle}>{i + 1}</td>
                  <td style={tdStyle}>
                    {editingId === s._id ? <input style={inputStyle} value={tempData.studentName} onChange={(e) => handleTempChange(e, "studentName")} /> : s.name}
                  </td>
                  <td style={tdStyle}>
                    {editingId === s._id ? <input style={inputStyle} value={tempData.fatherName} onChange={(e) => handleTempChange(e, "fatherName")} /> : s.fatherName}
                  </td>
                  <td style={tdStyle}>
                    {editingId === s._id ? <input style={inputStyle} value={tempData.className} onChange={(e) => handleTempChange(e, "className")} /> : s.class}
                  </td>
                  <td style={tdStyle}>
                    {editingId === s._id ? <input style={inputStyle} type="date" value={tempData.dob} onChange={(e) => handleTempChange(e, "dob")} /> : s.dob?.split("T")[0]}
                  </td>
                  <td style={tdStyle}>
                    {editingId === s._id ? <input style={inputStyle} value={tempData.mobile} onChange={(e) => handleTempChange(e, "mobile")} /> : s.mobile}
                  </td>
                  <td style={tdStyle}>
                    {editingId === s._id ? <input style={inputStyle} value={tempData.address} onChange={(e) => handleTempChange(e, "address")} /> : s.address}
                  </td>
                  <td style={tdStyle}>
                    {editingId === s._id ? <input style={inputStyle} value={tempData.other} onChange={(e) => handleTempChange(e, "other")} /> : s.other}
                  </td>
                  <td style={tdStyle}>
                    {s.photoUrl && (
                      <>
                        <img src={s.photoUrl} alt={s.name} width="50" style={{ borderRadius: "5px" }} />
                        <button onClick={() => handleDownloadPhoto(s.photoUrl, s.name)} style={downloadBtnStyle}>⬇️</button>
                        {editingId === s._id && <input type="file" style={{ marginTop: "5px" }} onChange={(e) => setTempPhoto(e.target.files[0])} />}
                      </>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {s.attachments?.length > 0 ? s.attachments.map((att, idx) => (
                      <a key={idx} href={att} target="_blank" rel="noreferrer" style={attachmentStyle}>View {idx + 1}</a>
                    )) : "No attachments"}
                  </td>
                  <td style={tdStyle}>
                    {editingId === s._id ? (
                      <>
                        <button style={successBtnStyle} onClick={() => handleUpdate(s._id)}>Update</button>
                        <button style={secondaryBtnStyle} onClick={handleCancel}>Cancel</button>
                      </>
                    ) : (
                      <button style={editBtnStyle} onClick={() => handleEditClick(s)}>Edit</button>
                    )}
                  </td>
                  <td style={tdStyle}><button style={deleteBtnStyle} onClick={() => handleDelete(s._id)}>Delete</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Inline styles
const containerStyle = { maxWidth: "1200px", margin: "2rem auto", padding: "2rem", background: "#f9f9f9", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" };
const headerStyle = { textAlign: "center", color: "#333", marginBottom: "1rem" };
const tableStyle = { width: "100%", borderCollapse: "collapse", minWidth: "900px" };
const theadStyle = { background: "#007bff", color: "#fff", textAlign: "left" };
const thStyle = { padding: "12px", borderBottom: "2px solid #ddd" };
const tdStyle = { padding: "10px", borderBottom: "1px solid #ddd", verticalAlign: "middle" };
const trEvenStyle = { background: "#fff" };
const trOddStyle = { background: "#f2f2f2" };
const primaryBtnStyle = { background: "#28a745", color: "#fff", padding: "0.5rem 1rem", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "1rem", fontWeight: "bold" };
const editBtnStyle = { background: "#ffc107", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" };
const deleteBtnStyle = { background: "#dc3545", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" };
const downloadBtnStyle = { background: "#007bff", color: "#fff", border: "none", padding: "2px 6px", borderRadius: "3px", cursor: "pointer", marginLeft: "5px" };
const attachmentStyle = { display: "block", color: "#007bff", textDecoration: "underline" };
const inputStyle = { width: "100%", padding: "5px", borderRadius: "4px", border: "1px solid #ccc" };
const successBtnStyle = { background: "#28a745", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", marginRight: "5px" };
const secondaryBtnStyle = { background: "#6c757d", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" };

export default StudentList;
