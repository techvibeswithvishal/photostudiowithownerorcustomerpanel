const School = require("../models/School");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// ==========================
// School Login
// ==========================
const schoolLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const school = await School.findOne({ loginId: email });
    if (!school) return res.status(404).json({ message: "School not found" });

    if (password !== school.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ schoolId: school._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ success: true, message: "Login successful", token, school });
  } catch (err) {
    console.error("❌ Error in schoolLogin:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Add New Student
// ==========================
const addStudent = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    if (!schoolId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { studentName, fatherName, className, dob, mobile, address, other } = req.body;

    if (!studentName || !fatherName || !className || !dob || !mobile) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    let photoUrl = "";
    let attachments = [];

    // Upload photo
    if (req.files?.photoUrl?.length) {
      const result = await cloudinary.uploader.upload(req.files.photoUrl[0].path, { folder: "students" });
      photoUrl = result.secure_url;
      fs.unlinkSync(req.files.photoUrl[0].path);
    }

    // Upload attachments
    if (req.files?.attachments?.length) {
      for (let file of req.files.attachments) {
        const result = await cloudinary.uploader.upload(file.path, { folder: "students/attachments" });
        attachments.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }

    const newStudent = await Student.create({
      schoolId,
      name: studentName,
      fatherName,
      class: className,
      dob,
      mobile,
      address,
      other,
      photoUrl,
      attachments
    });

    res.status(201).json({ success: true, message: "Student added successfully", student: newStudent });
  } catch (err) {
    console.error("❌ Error in addStudent:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==========================
// List Students
// ==========================
const listStudents = async (req, res) => {
  try {
    const schoolId = req.schoolId;
    const students = await Student.find({ schoolId });
    res.json({ success: true, students });
  } catch (err) {
    console.error("❌ Error in listStudents:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==========================
// Get Single Student
// ==========================
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    if (student.schoolId.toString() !== req.schoolId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    res.json({ success: true, student });
  } catch (err) {
    console.error("❌ Error in getStudentById:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==========================
// Update Student
// ==========================
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    if (student.schoolId.toString() !== req.schoolId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Update fields safely
    student.name = req.body.studentName || student.name;
    student.fatherName = req.body.fatherName || student.fatherName;
    student.class = req.body.className || student.class;
    student.dob = req.body.dob || student.dob;
    student.mobile = req.body.mobile || student.mobile;
    student.address = req.body.address || student.address;
    student.other = req.body.other || student.other;

    // Update photo
    if (req.files?.photoUrl?.length) {
      const result = await cloudinary.uploader.upload(req.files.photoUrl[0].path, { folder: "students" });
      student.photoUrl = result.secure_url;
      fs.unlinkSync(req.files.photoUrl[0].path);
    }

    // Update attachments
    if (req.files?.attachments?.length) {
      const attachmentUrls = [];
      for (let file of req.files.attachments) {
        const result = await cloudinary.uploader.upload(file.path, { folder: "students/attachments" });
        attachmentUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
      student.attachments = attachmentUrls;
    }

    await student.save();
    res.json({ success: true, message: "Student updated successfully", student });
  } catch (err) {
    console.error("❌ Error in updateStudent:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ==========================
// Delete Student
// ==========================
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    if (student.schoolId.toString() !== req.schoolId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await student.deleteOne();
    res.json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    console.error("❌ Error in deleteStudent:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  schoolLogin,
  addStudent,
  listStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
