const express = require("express");

const {
  getAllRestaurants,
  getRestaurantById,
  deleteRestaurantById,
  createNewRestaurant,
  updateRestaurantById,
} = require("../controllers/restaurantController");

const router = express.Router();

router.get("/restaurants", getAllRestaurants);
router.get("/restaurant/:id", getRestaurantById);
router.post("/restaurants", createNewRestaurant);
router.put("/restaurant/:id", updateRestaurantById);
router.delete("/restaurant/:id", deleteRestaurantById);

module.exports = router;
