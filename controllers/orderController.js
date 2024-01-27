const Order = require("../models/orderSchema");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json(orders);
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.status(200).json(order);
};

const deleteOrderById = async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
  if (!deletedOrder) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.status(200).json({ message: "Order deleted successfully" });
};

const createNewOrder = async (req, res) => {
  const newOrder = await Order.create(req.body);
  res.status(201).json(newOrder);
};

const updateOrderById = async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedOrder) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.status(200).json(updatedOrder);
};

module.exports = {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  createNewOrder,
  updateOrderById,
};
