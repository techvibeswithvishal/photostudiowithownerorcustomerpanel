const Owner = require('../models/Owner');
const School = require('../models/School');
const jwt = require('jsonwebtoken');

// ==========================
// Owner Login
// ==========================
const ownerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ success: false, error: "Email and password are required" });

    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(404).json({ success: false, error: "Owner not found" });

    // direct compare (no bcrypt)
    if (password !== owner.password) return res.status(400).json({ success: false, error: "Invalid credentials" });

    if (!process.env.JWT_SECRET) return res.status(500).json({ success: false, error: "Server configuration error" });

    const token = jwt.sign({ ownerId: owner._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.json({ success: true, message: "Login successful", token, owner });
  } catch (err) {
    console.error("❌ Error in ownerLogin:", err.message);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

// ==========================
// Create School
// ==========================
const createSchool = async (req, res) => {
  const { name, email, password } = req.body;
  const ownerId = req.ownerId;

  try {
    if (!name || !email || !password) return res.status(400).json({ success: false, error: "All fields are required" });

    const existingSchool = await School.findOne({ loginId: email });
    if (existingSchool) return res.status(400).json({ success: false, error: "School with this email already exists" });

    const newSchool = await School.create({ schoolName: name, loginId: email, password, ownerId });
    await Owner.findByIdAndUpdate(ownerId, { $push: { schools: newSchool._id } });

    return res.status(201).json({ success: true, message: "School created successfully", schoolId: newSchool._id, password });
  } catch (err) {
    console.error("❌ Error in createSchool:", err.message);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

// ==========================
// Get logged-in owner profile
// ==========================
const getOwnerProfile = async (req, res) => {
  try {
    const owner = await Owner.findById(req.ownerId).select("-password");
    if (!owner) return res.status(404).json({ success: false, error: "Owner not found" });
    res.json({ success: true, owner });
  } catch (err) {
    console.error("❌ Error in getOwnerProfile:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// ==========================
// List all schools (shared across owners)
// ==========================
const listSchools = async (req, res) => {
  try {
    const schools = await School.find().select("schoolName loginId password createdAt");
    res.json({ success: true, schools });
  } catch (err) {
    console.error("❌ Error in listSchools:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// ==========================
// Update School
// ==========================
const updateSchool = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const school = await School.findById(id);
    if (!school) return res.status(404).json({ success: false, error: "School not found" });

    // Update fields
    school.schoolName = name || school.schoolName;
    school.loginId = email || school.loginId;
    school.password = password || school.password;

    await school.save();
    res.json({ success: true, message: "School updated successfully" });
  } catch (err) {
    console.error("❌ Error in updateSchool:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// ==========================
// Delete School
// ==========================
const deleteSchool = async (req, res) => {
  const { id } = req.params;

  try {
    const school = await School.findById(id);
    if (!school) return res.status(404).json({ success: false, error: "School not found" });

    await School.findByIdAndDelete(id);
    // Remove school reference from owner
    await Owner.findByIdAndUpdate(school.ownerId, { $pull: { schools: id } });

    res.json({ success: true, message: "School deleted successfully" });
  } catch (err) {
    console.error("❌ Error in deleteSchool:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  ownerLogin,
  createSchool,
  getOwnerProfile,
  listSchools,
  updateSchool,
  deleteSchool
};
