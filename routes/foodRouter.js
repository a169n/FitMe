const express = require("express");
const {
  getAllFood,
  getFoodById,
  deleteFoodById,
  createNewFood,
  updateFoodById,
} = require("../controllers/foodController");

const router = express.Router();

router.get("/foods", getAllFood);
router.get("/food/:id", getFoodById);
router.post("/food", createNewFood);
router.put("/food/:id", updateFoodById);
router.delete("/food/:id", deleteFoodById);

module.exports = router;
