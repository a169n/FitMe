const express = require("express");
const {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateOrderById,
  createOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/orders", getAllOrders);
router.get("/order/:id", getOrderById);
router.post("/order", protect, createOrder);
router.put("/order/:id", updateOrderById);
router.delete("/order/:id", deleteOrderById);

module.exports = router;
