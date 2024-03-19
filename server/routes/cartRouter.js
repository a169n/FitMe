const express = require("express");
const router = express.Router();

const {
  addItemToCart,
  removeItemFromCart,
  getItemsNumberInCart,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addItemToCart);
router.delete("/remove", protect, removeItemFromCart);
router.get("/amount", protect, getItemsNumberInCart);
router.delete("/clear", protect, clearCart);

module.exports = router;
