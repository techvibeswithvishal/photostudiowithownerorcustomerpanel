// initDB.js
const mongoose = require('mongoose');
require('dotenv').config();

// ---------------- SCHEMAS ---------------- //

// Owner Schema
const ownerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // plain text (⚠️ security risk)
  createdAt: { type: Date, default: Date.now }
});
const Owner = mongoose.model('Owner', ownerSchema);

// School Schema
const schoolSchema = new mongoose.Schema({
  schoolName: String,
  loginId: String,
  password: String, // plain text
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
  createdAt: { type: Date, default: Date.now }
});
const School = mongoose.model('School', schoolSchema);

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  class: String,
  dob: Date,
  mobile: String,
  address: String,
  other: String,
  photoUrl: String,
  attachments: [String],
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
  createdAt: { type: Date, default: Date.now }
});
const Student = mongoose.model('Student', studentSchema);

// ---------------- CONNECT ---------------- //

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected successfully!");

    // Check if collections exist
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collNames = collections.map(c => c.name);

    if (!collNames.includes('owners')) await db.createCollection('owners');
    if (!collNames.includes('schools')) await db.createCollection('schools');
    if (!collNames.includes('students')) await db.createCollection('students');

    console.log("Collections ensured: owners, schools, students");

    // Create your default owner (plain password)
    const ownerExists = await Owner.findOne({ email: "vsin14729@gmail.com" });
    if (!ownerExists) {
      const owner = await Owner.create({
        name: "Vishal Singh",
        email: "vsin14729@gmail.com",
        password: "test1234" // 🚫 plain text password
      });
      console.log("Default owner created:", owner.email);
    } else {
      console.log("Owner already exists:", ownerExists.email);
    }

    console.log("✅ Initialization completed!");
    process.exit(0);
  })
  .catch(err => console.error("MongoDB connection error:", err));
