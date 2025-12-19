const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  updatePetStatus,
} = require("../controllers/petController");

router.get("/", getAllPets);
router.get("/:id", getPetById);
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  createPet
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updatePet
);
router.delete("/:id", protect, authorize("admin"), deletePet);
router.patch("/:id/status", protect, authorize("admin"), updatePetStatus);

module.exports = router;
