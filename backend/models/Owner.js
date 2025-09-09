const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  schools: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "School"
  }]
}, { timestamps: true });

module.exports = mongoose.model("Owner", ownerSchema);
