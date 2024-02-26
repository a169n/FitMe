const Food = require("../models/foodSchema");
const Category = require("../models/categorySchema");

const fs = require("fs");

const getAllFood = async (req, res) => {
  const foods = await Food.find({})
    .populate("globalCategory")
  res.status(200).json(foods);
};

const getFoodById = async (req, res) => {
  const food = await Food.findById(req.params.id)
    .populate("globalCategory")
  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }
  res.status(200).json(food);
};

const createNewFood = async (req, res) => {
  try {
    const { category, restaurant } = req.body;
    const imagePath = req.file.path;

    const food = await Food.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: imagePath,
      category: category,
      restaurant: restaurant,
    });

    await Category.findByIdAndUpdate(
      category,
      { $push: { foods: food._id } },
      { new: true }
    );

    res.status(201).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create food" });
  }
};

const searchFood = async (req, res) => {
  const { searchString } = req.query;

  const foods = await Food.find({
    name: new RegExp(searchString, "i"),
  });

  res.status(200).json(foods);
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
  searchFood,
  createNewFood,
  updateFoodById,
  deleteFoodById,
};
