const express = require("express");
const router = express.Router();
const {
  schoolLogin,
  addStudent,
  listStudents,
  updateStudent
} = require("../controllers/schoolController");
const { verifySchoolToken } = require("../middleware/authMiddleware");

// Public
router.post("/login", schoolLogin);

// Protected
router.use(verifySchoolToken); // All routes below require JWT
router.get("/dashboard", listStudents);  // Get students for dashboard
router.post("/student", addStudent);      // Add new student
router.put("/student/:id", updateStudent); // Update student

module.exports = router;
