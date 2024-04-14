const GlobalCategory = require("../models/globalCategory");

const getAllGlobalCategories = async (req, res) => {
  try {
    const categories = await GlobalCategory.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch global categories" });
  }
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
  try {
    const { name } = req.body;
    const imagePath = req.file.path;

    const globalCategory = await GlobalCategory.create({
      name: name,
      image: imagePath,
    });

    res.status(201).json(globalCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create global category" });
  }
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
