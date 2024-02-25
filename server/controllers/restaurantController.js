const Restaurant = require("../models/restaurantSchema");
const fs = require("fs");

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}).populate({
      path: "foods_id",
      populate: {
        path: "category_id",
        model: "Category",
      },
    });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNewRestaurant = async (req, res) => {
  const imagePath = req.file.path;
  const restaurant = await Restaurant.create({
    ...req.body,
    image: imagePath,
  });
  res.status(201).json(restaurant);
};

const getRestaurantById = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  res.status(200).json(restaurant);
};

const searchRestaurant = async (req, res) => {
  const { searchString } = req.query;

  const restaurants = await Restaurant.find({
    name: new RegExp(searchString, "i"),
  }).sort({ _id: -1 });

  res.status(200).json(restaurants);
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

const deleteAllRestaurants = async (req, res) => {
  try {
    await Restaurant.deleteMany({});
    res.status(200).json({ message: "All restaurants deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRestaurants,
  createNewRestaurant,
  searchRestaurant,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
  deleteAllRestaurants,
};
