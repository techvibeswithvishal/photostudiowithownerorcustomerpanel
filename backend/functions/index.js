const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { generateCSV } = require("./utils");

admin.initializeApp();
const db = admin.firestore();

/**
 * Cloud Function: Create School Account (Owner Only)
 */
exports.createSchoolAccount = functions.https.onCall(async (data, context) => {
  // ✅ Security: Only allow owner
  if (!context.auth || context.auth.token.role !== "owner") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only the owner can create schools."
    );
  }

  const { name, email } = data;
  if (!name || !email) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "School name and email are required."
    );
  }

  try {
    // Generate random password
    const password = Math.random().toString(36).slice(-8);

    // Create Firebase Auth user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // ✅ Assign school role
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: "school" });

    // Save school in Firestore
    await db.collection("schools").doc(userRecord.uid).set({
      name,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      message: "✅ School created successfully",
      schoolId: userRecord.uid,
      password, // return password to owner
    };
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

/**
 * Cloud Function: List All Schools (Owner Only)
 */
exports.listSchools = functions.https.onCall(async (data, context) => {
  // ✅ Security: Only allow owner
  if (!context.auth || context.auth.token.role !== "owner") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only the owner can view schools."
    );
  }

  try {
    const snapshot = await db.collection("schools").get();
    const schools = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { schools };
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});
