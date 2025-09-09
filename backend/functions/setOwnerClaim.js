// backend/functions/setOwnerClaim.js
require("dotenv").config();
const admin = require("firebase-admin");

// Initialize Firebase Admin using environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Fix newline characters
  }),
});

// Function to set owner role
async function setOwner(uid) {
  await admin.auth().setCustomUserClaims(uid, { role: "owner" });
  console.log("✅ Set owner claim for:", uid);
}

// Get UID from command line arguments
const uid = process.argv[2];
if (!uid) {
  console.error("Usage: node setOwnerClaim.js <uid>");
  process.exit(1);
}

// Run the function
setOwner(uid).catch(console.error);
