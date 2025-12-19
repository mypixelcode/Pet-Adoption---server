const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide pet name"],
    trim: true,
  },
  species: {
    type: String,
    required: [true, "Please specify species"],
    enum: ["Dog", "Cat", "Bird", "Rabbit", "Other"],
  },
  breed: {
    type: String,
    required: [true, "Please provide breed"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Please provide pet age"],
    min: [0, "Age cannot be negative"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  size: {
    type: String,
    enum: ["Small", "Medium", "Large"],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },
  healthStatus: {
    type: String,
    required: true,
    default: "Healthy",
  },
  vaccinated: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/300x300?text=Pet+Image",
  },
  status: {
    type: String,
    enum: ["available", "pending", "adopted"],
    default: "available",
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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

// Update the updatedAt field before saving
petSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Pet", petSchema);
