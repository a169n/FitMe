const Food = require("../models/foodSchema");
const Category = require("../models/categorySchema");

const fs = require("fs");

const getAllFood = async (req, res) => {
  const foods = await Food.find({}).populate("globalCategory");
  res.status(200).json(foods);
};

const getAllFoodsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const foods = await Food.find({ category: categoryId });

    if (foods.length === 0) {
      return res.status(404).json({ message: "No foods found for this category" });
    }

    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch foods for this category" });
  }
};

const getFoodById = async (req, res) => {
  const food = await Food.findById(req.params.id).populate("globalCategory");
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
  const { id } = req.params;
  try {
    let updates = req.body;

    if (req.file) {
      const imagePath = req.file.path;
      const food = await Food.findById(id);
      if (food && food.image) {
        const oldImagePath = `./${restaurant.image.split("\\").join("/")}`;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        } else {
          console.error(`File does not exist: ${oldImagePath}`);
        }
      }
      updates.image = imagePath;
    }

    const updatedFood = await Food.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedFood) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({
      message: `Error updating restaurant with id ${id}`,
      error: error,
    });
  }
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
  getAllFoodsByCategoryId,
  getFoodById,
  searchFood,
  createNewFood,
  updateFoodById,
  deleteFoodById,
};
