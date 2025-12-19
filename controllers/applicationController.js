const Application = require("../models/Application");
const Pet = require("../models/Pet");

// Submit adoption application
exports.submitApplication = async (req, res) => {
  try {
    const { petId, reason, experience, livingSpace, hasOtherPets } = req.body;

    // Check if pet exists and is available
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    if (pet.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "This pet is not available for adoption",
      });
    }

    // Check if user already applied for this pet
    const existingApplication = await Application.findOne({
      user: req.user.id,
      pet: petId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this pet",
      });
    }

    // Create application
    const application = await Application.create({
      user: req.user.id,
      pet: petId,
      reason,
      experience,
      livingSpace,
      hasOtherPets,
    });

    // Update pet status to pending
    await Pet.findByIdAndUpdate(petId, { status: "pending" });

    const populatedApplication = await Application.findById(application._id)
      .populate("user", "name email phone address")
      .populate("pet", "name species breed");

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: populatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user's own applications
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate("pet", "name species breed image status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all applications (Admin only)
exports.getAllApplications = async (req, res) => {
  try {
    let query = {};

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    const applications = await Application.find(query)
      .populate("user", "name email phone address")
      .populate("pet", "name species breed image status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single application details
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("user", "name email phone address")
      .populate("pet", "name species breed image status description");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Check authorization
    if (
      req.user.role !== "admin" &&
      application.user._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this application",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update application status (Admin only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be approved or rejected",
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "This application has already been processed",
      });
    }

    // Update application
    application.status = status;
    application.adminNotes = adminNotes || "";
    application.updatedAt = Date.now();
    await application.save();

    // Update pet status
    const pet = await Pet.findById(application.pet);
    if (status === "approved") {
      pet.status = "adopted";
      await pet.save();

      // Reject all other pending applications for this pet
      await Application.updateMany(
        {
          pet: application.pet,
          status: "pending",
          _id: { $ne: application._id },
        },
        {
          status: "rejected",
          adminNotes: "Pet already adopted by another applicant",
        }
      );
    } else {
      // Check if there are other pending applications
      const otherPendingApps = await Application.countDocuments({
        pet: application.pet,
        status: "pending",
        _id: { $ne: application._id },
      });

      if (otherPendingApps === 0) {
        pet.status = "available";
        await pet.save();
      }
    }

    const updatedApplication = await Application.findById(application._id)
      .populate("user", "name email phone address")
      .populate("pet", "name species breed image status");

    res.status(200).json({
      success: true,
      message: `Application ${status} successfully`,
      application: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Check authorization
    if (
      req.user.role !== "admin" &&
      application.user.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this application",
      });
    }

    await Application.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
