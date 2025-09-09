// routes/schoolStudentRoutes.js
const express = require("express");
const router = express.Router();
const { addStudent, listStudents, updateStudent } = require("../controllers/schoolController");
const { verifySchoolToken } = require("../middleware/verifyToken");

// Add new student
router.post("/add", verifySchoolToken, addStudent);

// List students for logged-in school
router.get("/list", verifySchoolToken, listStudents);

// Update student
router.put("/:id", verifySchoolToken, updateStudent);

module.exports = router;
