const express = require("express");

const {
  getAllRestaurants,
  getRestaurantById,
  deleteRestaurantById,
  createNewRestaurant,
  updateRestaurantById,
  searchRestaurant,
  deleteAllRestaurants,
} = require("../controllers/restaurantController");
const { protect } = require("../middleware/authMiddleware");

const upload = require("../multer");

const router = express.Router();

router.get("/restaurants", getAllRestaurants);
router.get("/restaurant/:id", getRestaurantById);
router.get("/restaurants/search", searchRestaurant);
router.post("/restaurants", upload.single("image"), createNewRestaurant);
router.put("/restaurant/:id", updateRestaurantById);
router.delete("/restaurant/:id", deleteRestaurantById);
router.delete("/restaurants/clear", protect, deleteAllRestaurants);

module.exports = router;
