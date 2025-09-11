import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";

const AddStudent = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    className: "",
    dob: "",
    mobile: "",
    address: "",
    other: "",
  });

  const [photo, setPhoto] = useState(null);
  const [attachments, setAttachments] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [tempData, setTempData] = useState({});
  const [tempPhoto, setTempPhoto] = useState(null);
  const [tempAttachments, setTempAttachments] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("schoolToken");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/school/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setStudents(res.data.students);
    } catch (err) {
      console.error("❌ Error fetching students:", err.response?.data?.message || err.message);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleTempChange = (e, field) => setTempData({ ...tempData, [field]: e.target.value });

  // Handle file input
  const handlePhotoChange = (e, isTemp = false) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(URL.createObjectURL(file));
    setShowCropper(true);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    if (isTemp) setTempPhoto(file);
    else setPhoto(file);
  };

  const onCropComplete = useCallback((_, croppedPixels) => setCroppedAreaPixels(croppedPixels), []);

  const handleCropSave = async () => {
    try {
      const croppedBlob = await getCroppedImg(selectedImage, croppedAreaPixels);
      setPhoto(croppedBlob);
      setShowCropper(false);
    } catch (err) {
      console.error("❌ Crop failed:", err);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (photo) formData.append("photoUrl", photo);
    if (attachments.length > 0) Array.from(attachments).forEach((file) => formData.append("attachments", file));

    try {
      const res = await axios.post(`${backendUrl}/api/school/add`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        alert("✅ Student added successfully!");
        setStudents([...students, res.data.student]);
        setForm({ studentName: "", fatherName: "", className: "", dob: "", mobile: "", address: "", other: "" });
        setPhoto(null);
        setAttachments([]);
      }
    } catch (err) {
      console.error("❌ Error adding student:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Failed to add student");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`${backendUrl}/api/school/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setStudents(students.filter((s) => s._id !== id));
      alert("🗑️ Student deleted successfully");
    } catch (err) {
      console.error("❌ Error deleting student:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };





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
    setTempPhoto(null);
    setTempAttachments([]);
  };

  const handleCancel = () => {
    setEditingId(null);
    setTempData({});
    setTempPhoto(null);
    setTempAttachments([]);
  };




  
  const handleUpdate = async (id) => {
    const formData = new FormData();
    Object.keys(tempData).forEach((key) => formData.append(key, tempData[key]));
    if (tempPhoto) formData.append("photoUrl", tempPhoto);
    if (tempAttachments.length > 0) Array.from(tempAttachments).forEach((file) => formData.append("attachments", file));

    try {
      const res = await axios.put(`${backendUrl}/api/school/${id}`, formData, {
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

  return (
    <div style={{ maxWidth: "1200px", margin: "2rem auto", padding: "2rem", background: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>Add Student</h2>

      {/* FORM */}
      <form onSubmit={handleAddSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <input style={inputStyle} name="studentName" placeholder="Name" value={form.studentName} onChange={handleChange} required />
        <input style={inputStyle} name="fatherName" placeholder="Father Name" value={form.fatherName} onChange={handleChange} required />
        <input style={inputStyle} name="className" placeholder="Class" value={form.className} onChange={handleChange} required />
        <input style={inputStyle} type="date" name="dob" value={form.dob} onChange={handleChange} required />
        <input style={inputStyle} name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
        <input style={inputStyle} name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input style={inputStyle} name="other" placeholder="Other" value={form.other} onChange={handleChange} />

        <label style={{ gridColumn: "1 / -1", fontWeight: "bold" }}>Upload Photo:</label>
        <input type="file" accept="image/*" style={inputStyle} onChange={handlePhotoChange} />
        {photo && <img src={URL.createObjectURL(photo)} alt="Preview" width="80" style={{ borderRadius: "5px", margin: "0.5rem 0" }} />}

        {showCropper && selectedImage && (
          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", alignItems: "center", background: "#fff", padding: "1rem", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
            <div style={{ position: "relative", width: "250px", height: "250px" }}>
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(e.target.value)} style={{ marginTop: "10px", width: "80%" }} />
            <button type="button" style={primaryBtnStyle} onClick={handleCropSave}>✅ Save Crop</button>
          </div>
        )}

        <label style={{ gridColumn: "1 / -1", fontWeight: "bold" }}>Upload Attachments:</label>
        <input type="file" multiple style={inputStyle} onChange={(e) => setAttachments(e.target.files)} />
        {attachments.length > 0 && <p style={{ gridColumn: "1 / -1" }}>{attachments.length} file(s) selected</p>}

        <button type="submit" style={primaryBtnStyle}>➕ Add Student</button>
      </form>

      {/* STUDENT TABLE */}
      <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>Currently Added Students</h3>
      <table style={tableStyle}>
        <thead style={{ background: "#007bff", color: "#fff" }}>
          <tr>
            {["Sr No.", "Name", "Father Name", "Class", "DOB", "Mobile", "Address", "Other", "Photo", "Attachments", "Edit", "Delete"].map((h, i) => (
              <th key={i} style={{ padding: "10px", textAlign: "left" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr><td colSpan="12" style={{ textAlign: "center", padding: "1rem" }}>No students found</td></tr>
          ) : (
            students.map((s, i) => (
              <tr key={s._id} style={{ background: i % 2 === 0 ? "#fff" : "#f2f2f2" }}>
                <td style={tdStyle}>{i + 1}</td>
                <td style={tdStyle}>{editingId === s._id ? <input style={inputStyle} value={tempData.studentName} onChange={(e) => handleTempChange(e, "studentName")} /> : s.name}</td>
                <td style={tdStyle}>{editingId === s._id ? <input style={inputStyle} value={tempData.fatherName} onChange={(e) => handleTempChange(e, "fatherName")} /> : s.fatherName}</td>
                <td style={tdStyle}>{editingId === s._id ? <input style={inputStyle} value={tempData.className} onChange={(e) => handleTempChange(e, "className")} /> : s.class}</td>
                <td style={tdStyle}>{editingId === s._id ? <input style={inputStyle} type="date" value={tempData.dob} onChange={(e) => handleTempChange(e, "dob")} /> : s.dob?.split("T")[0]}</td>
                <td style={tdStyle}>{editingId === s._id ? <input style={inputStyle} value={tempData.mobile} onChange={(e) => handleTempChange(e, "mobile")} /> : s.mobile}</td>
                <td style={tdStyle}>{editingId === s._id ? <input style={inputStyle} value={tempData.address} onChange={(e) => handleTempChange(e, "address")} /> : s.address}</td>
                <td style={tdStyle}>{editingId === s._id ? <input style={inputStyle} value={tempData.other} onChange={(e) => handleTempChange(e, "other")} /> : s.other}</td>
                <td style={tdStyle}>{s.photoUrl && <img src={s.photoUrl} alt={s.name} width="50" style={{ borderRadius: "5px" }} />}</td>
                <td style={tdStyle}>{s.attachments?.length > 0 ? s.attachments.map((att, idx) => (<a key={idx} href={att} target="_blank" rel="noreferrer" style={{ display: "block" }}>View {idx + 1}</a>)) : "No attachments"}</td>
                <td style={tdStyle}>
                  {editingId === s._id ? (
                    <>
                      <button style={successBtnStyle} onClick={() => handleUpdate(s._id)}>Update</button>
                      <button style={secondaryBtnStyle} onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <button style={warningBtnStyle} onClick={() => handleEditClick(s)}>Edit</button>
                  )}
                </td>
                <td style={tdStyle}><button style={dangerBtnStyle} onClick={() => handleDelete(s._id)}>Delete</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// 🔹 Reusable Inline Styles
const inputStyle = { padding: "0.6rem", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem", width: "100%" };
const tableStyle = { width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" };
const tdStyle = { padding: "10px", borderBottom: "1px solid #ddd" };

const primaryBtnStyle = { gridColumn: "1 / -1", background: "#007bff", color: "white", padding: "0.7rem 1.2rem", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" };
const warningBtnStyle = { background: "#ffc107", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer" };
const successBtnStyle = { background: "#28a745", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer", color: "white", marginRight: "5px" };
const secondaryBtnStyle = { background: "#6c757d", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer", color: "white" };
const dangerBtnStyle = { background: "#dc3545", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px", cursor: "pointer" };

export default AddStudent;
