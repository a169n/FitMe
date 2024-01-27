const express = require("express");
const {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  createNewOrder,
  updateOrderById,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/orders", getAllOrders);
router.get("/order/:id", getOrderById);
router.post("/order", createNewOrder);
router.put("/order/:id", updateOrderById);
router.delete("/order/:id", deleteOrderById);

module.exports = router;
