const Student = require("../models/Student");
const School = require("../models/School");

// Get students for owner (view-only)
const getStudents = async (req, res) => {
  try {
    const ownerId = req.ownerId;

    // Find all schools owned by this owner
    const schools = await School.find({ ownerId }).select("_id schoolName");

    const schoolIds = schools.map((school) => school._id);

    // Find students belonging to these schools
    const students = await Student.find({ schoolId: { $in: schoolIds } });

    res.json({ success: true, students });
  } catch (err) {
    console.error("❌ Error in getStudents for owner:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getStudents };
