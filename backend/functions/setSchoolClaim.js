require("dotenv").config();
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

// Function to set school role
async function setSchool(uid) {
  await admin.auth().setCustomUserClaims(uid, { role: "school" });
  console.log("✅ Set school claim for:", uid);
}

// Get UID from command line
const uid = process.argv[2];
if (!uid) {
  console.error("Usage: node setSchoolClaim.js <uid>");
  process.exit(1);
}

// Run function
setSchool(uid).catch(console.error);
