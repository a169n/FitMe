const Food = require("../models/foodSchema");
const Category = require("../models/categorySchema");
const Restaurant = require("../models/restaurantSchema");
const GlobalCategory = require("../models/globalCategory");

const fs = require("fs");

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find({})
      .populate("category")
      .populate("restaurant")
      .populate("globalCategory");

    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch foods" });
  }
};

const getAllFoodsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const foods = await Food.find({ category: categoryId });

    if (foods.length === 0) {
      return res
        .status(404)
        .json({ message: "No foods found for this category" });
    }

    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch foods for this category" });
  }
};

const getFoodById = async (req, res) => {
  const food = await Food.findById(req.params.id)
    .populate("category")
    .populate("restaurant")
    .populate("globalCategory");
  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }
  res.status(200).json(food);
};

const createNewFood = async (req, res) => {
  try {
    const { category, restaurant, globalCategory } = req.body;
    const imagePath = req.file.path;

    const food = await Food.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: imagePath,
      category: category,
      restaurant: restaurant,
      globalCategory: globalCategory,
    });

    await Category.findByIdAndUpdate(
      category,
      { $push: { foods: food._id } },
      { new: true }
    );

    await GlobalCategory.findByIdAndUpdate(
      globalCategory,
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
  const { searchString, page = 1, limit = 6 } = req.query;
  const count = await Food.countDocuments({
    $or: [
      { name: new RegExp(searchString, "i") },
      { description: new RegExp(searchString, "i") },
    ],
  });
  const foods = await Food.find({
    $or: [
      { name: new RegExp(searchString, "i") },
      { description: new RegExp(searchString, "i") },
    ],
  })
    .sort({ _id: -1 })
    .limit(+limit)
    .skip((page - 1) * limit);
  res.status(200).json({ data: foods, totalPages: Math.ceil(count / limit) });
};

const updateFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    let updates = req.body;

    if (req.file) {
      const imagePath = req.file.path;
      const food = await Food.findById(id);
      if (food && food.image) {
        const oldImagePath = `./${food.image.split("\\").join("/")}`;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        } else {
          console.error(`File does not exist: ${oldImagePath}`);
        }
      }
      updates = { ...updates, image: imagePath };
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
      error: error.message,
    });
  }
};

const deleteFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    if (food.image) {
      const imagePath = `./${food.image.split("\\").join("/")}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.error(`File does not exist: ${imagePath}`);
      }
    }

    await GlobalCategory.updateOne(
      { foods: req.params.id },
      { $pull: { foods: req.params.id } }
    );

    const restaurant = await Restaurant.findById(food.restaurant);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    await Category.updateMany(
      { _id: { $in: restaurant.categories } },
      { $pull: { foods: req.params.id } }
    );

    await Restaurant.findByIdAndUpdate(food.restaurant, {
      $pull: { foods: req.params.id },
    });

    await Food.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllFoods,
  getAllFoodsByCategoryId,
  getFoodById,
  searchFood,
  createNewFood,
  updateFoodById,
  deleteFoodById,
};
