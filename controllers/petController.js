const Pet = require("../models/Pet");

// Get all pets with filters, search, and pagination
exports.getAllPets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Search by name or breed
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { breed: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // Filter by species
    if (req.query.species) {
      query.species = req.query.species;
    }

    // Filter by breed
    if (req.query.breed) {
      query.breed = { $regex: req.query.breed, $options: "i" };
    }

    // Filter by age range
    if (req.query.minAge || req.query.maxAge) {
      query.age = {};
      if (req.query.minAge) query.age.$gte = parseInt(req.query.minAge);
      if (req.query.maxAge) query.age.$lte = parseInt(req.query.maxAge);
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Get total count for pagination
    const total = await Pet.countDocuments(query);

    // Execute query with pagination
    const pets = await Pet.find(query)
      .populate("addedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: pets.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      pets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single pet by ID
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate(
      "addedBy",
      "name email"
    );

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    res.status(200).json({
      success: true,
      pet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new pet (Admin only)
exports.createPet = async (req, res) => {
  try {
    const petData = {
      ...req.body,
      addedBy: req.user.id,
    };

    // Handle image upload
    if (req.file) {
      petData.image = `/uploads/${req.file.filename}`;
    }

    const pet = await Pet.create(petData);

    res.status(201).json({
      success: true,
      message: "Pet added successfully",
      pet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update pet (Admin only)
exports.updatePet = async (req, res) => {
  try {
    let pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    const updateData = { ...req.body };

    // Handle image upload
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    pet = await Pet.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Pet updated successfully",
      pet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete pet (Admin only)
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    await Pet.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Pet deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update pet status (Admin only)
exports.updatePetStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["available", "pending", "adopted"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet status updated successfully",
      pet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
