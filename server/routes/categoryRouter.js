const express = require("express");
const {
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  createNewCategory,
  updateCategoryById,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/categories", getAllCategories);
router.get("/category/:id", getCategoryById);
router.post("/category", createNewCategory);
router.put("/category/:id", updateCategoryById);
router.delete("/category/:id", deleteCategoryById);

module.exports = router;
