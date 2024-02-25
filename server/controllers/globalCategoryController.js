const GlobalCategory = require("../models/globalCategory");

const getAllGlobalCategories = async (req, res) => {
  const categories = await GlobalCategory.find({});
  res.status(200).json(categories);
};

const getGlobalCategoryById = async (req, res) => {
  const category = await GlobalCategory.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
};

const deleteGlobalCategoryById = async (req, res) => {
  const deletedCategory = await GlobalCategory.findByIdAndDelete(req.params.id);
  if (!deletedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ message: "Category deleted successfully" });
};

const createNewGlobalCategory = async (req, res) => {
  const newCategory = await GlobalCategory.create(req.body);
  res.status(201).json(newCategory);
};

const updateGlobalCategoryById = async (req, res) => {
  const updatedCategory = await GlobalCategory.findByIdAndUpdate(
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
  getAllGlobalCategories,
  getGlobalCategoryById,
  deleteGlobalCategoryById,
  createNewGlobalCategory,
  updateGlobalCategoryById,
};
