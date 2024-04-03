const Order = require("../models/orderSchema");
const Food = require("../models/foodSchema");
const User = require("../models/userSchema");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("user")
    .populate("restaurant")
    .populate("orderProducts")
    .populate("review");
  res.status(200).json(orders);
};

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    const user = req.user;

    const productsIds = orderData.orderProducts.map((product) => {
      return product.product;
    });

    const products = await Food.find({ _id: { $in: productsIds } });

    let sum = 0;

    products.forEach(
      (product) =>
        (sum +=
          product.price *
          orderData.orderProducts.find(
            (orderProduct) => orderProduct.product == product._id
          ).amount)
    );

    const newOrder = await Order.create({
      restaurant: orderData.restaurant,
      user: req.user._id,
      totalSum: sum,
      orderProducts: orderData.orderProducts,
    });

    if (newOrder && sum > 0)
      await User.findByIdAndUpdate(user._id, { cart: [] }, { new: true });

    res.status(201).json(newOrder);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Could not create order" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("restaurant")
      .populate("orderProducts")
      .populate("review");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrderById = async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
  if (!deletedOrder) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.status(200).json({ message: "Order deleted successfully" });
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

const deleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany({});
    res.status(200).json({ message: "All orders deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Could not delete orders" });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  deleteOrderById,
  updateOrderById,
  deleteAllOrders,
};
