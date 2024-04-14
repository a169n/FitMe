const express = require("express");
const {
  getAllGlobalCategories,
  getGlobalCategoryById,
  createNewGlobalCategory,
  updateGlobalCategoryById,
  deleteGlobalCategoryById,
} = require("../controllers/globalCategoryController");

const router = express.Router();
const upload = require("../multer");
// '/categories'
router.get("/global/categories", getAllGlobalCategories);
router.get("/global/categories/:id", getGlobalCategoryById);
router.post(
  "/global/categories",
  upload.single("image"),
  createNewGlobalCategory
);
router.put("/global/categories/:id", updateGlobalCategoryById);
router.delete("/global/categories/:id", deleteGlobalCategoryById);

module.exports = router;
