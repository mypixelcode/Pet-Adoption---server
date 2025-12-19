const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  reason: {
    type: String,
    required: [true, "Please provide reason for adoption"],
    maxlength: [500, "Reason cannot exceed 500 characters"],
  },
  experience: {
    type: String,
    required: [true, "Please describe your experience with pets"],
  },
  livingSpace: {
    type: String,
    enum: ["Apartment", "House", "Farm"],
    required: true,
  },
  hasOtherPets: {
    type: Boolean,
    default: false,
  },
  adminNotes: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate applications for same pet by same user
applicationSchema.index({ user: 1, pet: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
