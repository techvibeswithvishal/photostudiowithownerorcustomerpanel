// src/pages/student/GoogleFormLink.jsx
import React, { useState, useContext, useCallback } from "react";
import Cropper from "react-easy-crop";
import { SchoolAuthContext } from "../../context/SchoolPanelAuthContext";
import getCroppedImg from "../../utils/cropImage";
import "../../styles/GoogleFormLink.css";

const GoogleFormLink = () => {
  const { schoolUser } = useContext(SchoolAuthContext);

  const [studentData, setStudentData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    class: "",
    dob: "",
    mobile: "",
    parentMobile: "",
    address: "",
    schoolName: schoolUser?.name || "",
    schoolId: schoolUser?.schoolId || "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  // ✅ handle input fields
  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  // ✅ handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoUrl(URL.createObjectURL(file));
    setShowCropper(true);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  // ✅ crop complete
  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  // ✅ save cropped image
  const handleCropSave = async () => {
    if (!photoUrl || !croppedAreaPixels) return;
    const croppedImage = await getCroppedImg(photoUrl, croppedAreaPixels);
    setPhotoFile(croppedImage);
    setPhotoUrl(URL.createObjectURL(croppedImage));
    setShowCropper(false);
  };

  // ✅ reset image
  const handleChangeImage = () => {
    setPhotoFile(null);
    setPhotoUrl(null);
    setShowCropper(false);
  };

  // ✅ convert to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  // ✅ submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const photoBase64 = photoFile ? await toBase64(photoFile) : null;
      const payload = { ...studentData, photoBase64 };

      const response = await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Student Added Successfully!");
        setStudentData({
          name: "",
          fatherName: "",
          motherName: "",
          class: "",
          dob: "",
          mobile: "",
          parentMobile: "",
          address: "",
          schoolName: schoolUser?.name || "",
          schoolId: schoolUser?.schoolId || "",
        });
        handleChangeImage();
      } else {
        console.error(result.error);
        alert("❌ Failed to add student. Check console.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add student. Check console.");
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Student</h2>
      <form onSubmit={handleSubmit} className="form">
        {["name", "fatherName", "motherName", "class"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={studentData[field]}
            onChange={handleChange}
            placeholder={field}
            required
            className="input-field"
          />
        ))}

        <input type="date" name="dob" value={studentData.dob} onChange={handleChange} required className="input-field" />
        <input type="tel" name="mobile" value={studentData.mobile} onChange={handleChange} placeholder="Mobile No" required className="input-field" />
        <input type="tel" name="parentMobile" value={studentData.parentMobile} onChange={handleChange} placeholder="Parent Mobile No" required className="input-field" />
        <textarea name="address" value={studentData.address} onChange={handleChange} placeholder="Address" className="input-field"></textarea>

        <input type="file" accept="image/*" onChange={handleFileChange} className="input-field" />

        {showCropper && photoUrl && (
          <div className="crop-container">
            <Cropper
              image={photoUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <button type="button" onClick={handleCropSave} className="btn">
              Save Crop
            </button>
          </div>
        )}

        {photoFile && !showCropper && (
          <img src={URL.createObjectURL(photoFile)} alt="Preview" className="thumbnail" />
        )}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Submitting..." : "+ Add Student"}
        </button>
      </form>
    </div>
  );
};

export default GoogleFormLink;
