const Category = require("../models/categorySchema");
const Restaurant = require("../models/restaurantSchema");


const getAllCategories = async (req, res) => {
  const categories = await Category.find({}).populate("foods");
  res.status(200).json(categories);
};

const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
};

const getCategoriesByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const categories = await Category.find({ restaurant: restaurantId }).populate("foods");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategoryById = async (req, res) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.id);
  if (!deletedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ message: "Category deleted successfully" });
};

const createNewCategory = async (req, res) => {
  try {
    const { restaurant } = req.body;

    const newCategory = await Category.create(req.body);

    await Restaurant.findByIdAndUpdate(
      restaurant,
      { $push: { categories: newCategory._id } },
      { new: true }
    );

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategoryById = async (req, res) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(updatedCategory);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoriesByRestaurantId,
  deleteCategoryById,
  createNewCategory,
  updateCategoryById,
};
