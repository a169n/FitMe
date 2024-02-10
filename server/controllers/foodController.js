const Food = require("../models/foodSchema");

const getAllFood = async (req, res) => {
  const foods = await Food.find({}).populate("category_id").populate("restaurant_id")
  res.status(200).json(foods);
};

const getFoodById = async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }
  res.status(200).json(food);
};

const createNewFood = async (req, res) => {
  const newFood = await Food.create(req.body);
  res.status(201).json(newFood);
};

const updateFoodById = async (req, res) => {
  const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedFood) {
    return res.status(404).json({ message: "Food not found" });
  }
  res.status(200).json(updatedFood);
};

const deleteFoodById = async (req, res) => {
  const deletedFood = await Food.findByIdAndDelete(req.params.id);
  if (!deletedFood) {
    return res.status(404).json({ message: "Food not found" });
  }
  res.status(200).json({ message: "Food deleted successfully" });
};

module.exports = {
  getAllFood,
  getFoodById,
  createNewFood,
  updateFoodById,
  deleteFoodById,
};
