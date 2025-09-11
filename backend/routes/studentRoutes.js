// routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const {
  addStudent,
  listStudents,
  updateStudent,
  getStudentById,
  deleteStudent,
} = require("../controllers/schoolController");
const { verifySchoolToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// ==========================
// Protected Routes (JWT required)
// ==========================

// ✅ List students
router.get("/list", verifySchoolToken, listStudents);

// ✅ Get single student by ID
router.get("/:id", verifySchoolToken, getStudentById);

// ✅ Add new student (with file upload support)
router.post(
  "/add",
  verifySchoolToken,
  upload.fields([
    { name: "photo", maxCount: 1 },       // use same name as frontend formData
    { name: "attachments", maxCount: 5 } // allow multiple attachments
  ]),
  addStudent
);

// ✅ Update student
router.put(
  "/:id",
  verifySchoolToken,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "attachments", maxCount: 5 }
  ]),
  updateStudent
);

// ✅ DELETE student (this was missing)
router.delete("/:id", verifySchoolToken, deleteStudent);

module.exports = router;
