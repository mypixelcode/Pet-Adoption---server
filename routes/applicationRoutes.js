const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  submitApplication,
  getMyApplications,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/applicationController");

router.post("/", protect, submitApplication);
router.get("/my-applications", protect, getMyApplications);
router.get("/all", protect, authorize("admin"), getAllApplications);
router.get("/:id", protect, getApplicationById);
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  updateApplicationStatus
);
router.delete("/:id", protect, deleteApplication);

module.exports = router;
