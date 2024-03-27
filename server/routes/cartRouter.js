const express = require("express");
const router = express.Router();

const {
  addItemToCart,
  removeItemFromCart,
  getItemsNumberInCart,
  clearCart,
  changeItemAmountByOne,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addItemToCart);
router.put("/amount", protect, changeItemAmountByOne);
router.get("/amount", protect, getItemsNumberInCart);
router.delete("/remove", protect, removeItemFromCart);
router.delete("/clear", protect, clearCart);


module.exports = router;
