const express = require("express");
const router = express.Router();
const {
  ownerLogin,
  createSchool,
  getOwnerProfile,
  listSchools,
  updateSchool,
  deleteSchool
} = require("../controllers/ownerController");
const { verifyOwnerToken } = require("../middleware/authMiddleware");

// Public route
router.post("/login", ownerLogin);

// Protected routes (JWT required)
router.get("/me", verifyOwnerToken, getOwnerProfile);
router.get("/list-schools", verifyOwnerToken, listSchools);
router.post("/create-school", verifyOwnerToken, createSchool);

// Add update and delete routes
router.put("/school/:id", verifyOwnerToken, updateSchool);
router.delete("/school/:id", verifyOwnerToken, deleteSchool);

module.exports = router;
