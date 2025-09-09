const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
    trim: true
  },
  loginId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }]
}, { timestamps: true });

module.exports = mongoose.model("School", schoolSchema);
