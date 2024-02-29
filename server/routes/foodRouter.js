const express = require("express");
const {
  getAllFood,
  getFoodById,
  deleteFoodById,
  createNewFood,
  updateFoodById,
  searchFood,
  getAllFoodsByCategoryId,
} = require("../controllers/foodController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../multer");

const router = express.Router();

router.get("/foods", getAllFood);
router.get("/foods/category/:categoryId", getAllFoodsByCategoryId);
router.get("/food/:id", getFoodById);
router.post("/food", upload.single("image"), createNewFood);
router.get("/foods/search", searchFood);
router.put("/food/:id", upload.single("image"), updateFoodById);
router.delete("/food/:id", deleteFoodById);

module.exports = router;
