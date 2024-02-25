const express = require("express");
const {
  getAllFood,
  getFoodById,
  deleteFoodById,
  createNewFood,
  updateFoodById,
  searchFood,
} = require("../controllers/foodController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/foods", getAllFood);
router.get("/food/:id", getFoodById);
router.post("/food", createNewFood);
router.get("/foods/search", searchFood);
router.put("/food/:id", updateFoodById);
router.delete("/food/:id", deleteFoodById);

module.exports = router;
