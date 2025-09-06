const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { generateCSV } = require("./utils");

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

/**
 * Cloud Function: Download Students as CSV
 * Usage: 
 *   GET https://<your-region>-<project>.cloudfunctions.net/downloadStudentsCSV?schoolId=123
 */
exports.downloadStudentsCSV = functions.https.onRequest(async (req, res) => {
  try {
    const schoolId = req.query.schoolId;

    if (!schoolId) {
      return res.status(400).send("❌ Missing schoolId in request query.");
    }

    // Fetch students of given schoolId
    const studentsSnapshot = await db
      .collection("students")
      .where("schoolId", "==", schoolId)
      .get();

    if (studentsSnapshot.empty) {
      return res.status(404).send("⚠️ No students found for this school.");
    }

    const students = studentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Generate CSV using utils
    const csv = generateCSV(students);

    // Send CSV as response
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="students_${schoolId}.csv"`
    );
    res.status(200).send(csv);

  } catch (error) {
    console.error("🔥 Error generating CSV:", error);
    res.status(500).send("Internal Server Error. Check function logs.");
  }
});
