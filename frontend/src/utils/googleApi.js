// src/utils/googleApi.js
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export const submitStudentData = async (studentData, photoFile) => {
  try {
    const formData = new FormData();
    formData.append("name", studentData.name);
    formData.append("schoolName", studentData.schoolName);
    formData.append("fatherName", studentData.fatherName);
    formData.append("motherName", studentData.motherName);
    formData.append("class", studentData.class);
    formData.append("dob", studentData.dob);
    formData.append("mobile", studentData.mobile);
    formData.append("parentMobile", studentData.parentMobile);
    formData.append("address", studentData.address);
    formData.append("schoolId", studentData.schoolId);

    if (photoFile) {
      formData.append("photo", photoFile);
    }

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
    });

    let result = { success: false };
    try {
      result = await response.json();
    } catch (err) {
      console.warn("⚠️ Failed to parse JSON response", err);
    }

    return result;
  } catch (error) {
    console.error("❌ Error uploading student:", error);
    return { success: false, error };
  }
};
