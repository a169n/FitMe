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

router.get("/categories/global", getAllGlobalCategories);
router.get("/category/global/:id", getGlobalCategoryById);
router.post(
  "/category/global",
  upload.single("image"),
  createNewGlobalCategory
);
router.put("/category/global/:id", updateGlobalCategoryById);
router.delete("/category/global/:id", deleteGlobalCategoryById);

module.exports = router;
