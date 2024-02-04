const Restaurant = require("../models/restaurantSchema");

const getAllRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find({});
  res.status(200).json(restaurants);
};

const createNewRestaurant = async (req, res) => {
  const newRestaurant = await Restaurant.create(req.body);
  res.status(201).json(newRestaurant);
};

const getRestaurantById = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  res.status(200).json(restaurant);
};

const updateRestaurantById = async (req, res) => {
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedRestaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  res.status(200).json(updatedRestaurant);
};

const deleteRestaurantById = async (req, res) => {
  const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
  if (!deletedRestaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  res.status(200).json({ message: "Restaurant deleted successfully" });
};

module.exports = {
  getAllRestaurants,
  createNewRestaurant,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
};
