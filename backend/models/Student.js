const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true
  },
  fatherName: {
    type: String,
    required: true,
    trim: true
  },
  class: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String,
    trim: true
  },
  other: {
    type: String,
    trim: true
  },
  photoUrl: {
    type: String,
    default: ""
  },
  attachments: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
