const Category = require("../models/categorySchema");

const getAllCategories = async (req, res) => {
  const categories = await Category.find({}).populate("restaurant_id");
  res.status(200).json(categories);
};

const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
};

const deleteCategoryById = async (req, res) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.id);
  if (!deletedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ message: "Category deleted successfully" });
};

const createNewCategory = async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json(newCategory);
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
  deleteCategoryById,
  createNewCategory,
  updateCategoryById,
};
