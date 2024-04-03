const express = require("express");
const {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateOrderById,
  createOrder,
  deleteAllOrders,
  rateOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/orders", getAllOrders);
router.get("/order/:id", getOrderById);
router.post("/rate/:orderId", protect, rateOrder);
router.post("/order", protect, createOrder);
router.put("/order/:id", updateOrderById);
router.delete("/order/:id", deleteOrderById);
router.delete("/orders", deleteAllOrders);

module.exports = router;
