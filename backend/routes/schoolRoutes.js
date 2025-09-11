const express = require("express");
const router = express.Router();
const {
  schoolLogin,
  addStudent,
  listStudents,
  updateStudent,
  getStudentById,
  deleteStudent
} = require("../controllers/schoolController");
const { verifySchoolToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// ==========================
// Public Routes
// ==========================
router.post("/login", schoolLogin);

// ==========================
// Protected Routes (JWT required)
// ==========================
router.use(verifySchoolToken);

// Get all students
router.get("/list", listStudents);

// Get single student by ID
router.get("/:id", getStudentById);

// Add a new student (with file upload)
router.post(
  "/add",
  upload.fields([
    { name: "photoUrl", maxCount: 1 },
    { name: "attachments", maxCount: 5 }
  ]),
  addStudent
);

// Update student by ID
router.put(
  "/:id",
  upload.fields([
    { name: "photoUrl", maxCount: 1 },
    { name: "attachments", maxCount: 5 }
  ]),
  updateStudent
);

// Delete student by ID
router.delete("/:id", deleteStudent);

module.exports = router;
