const Order = require("../models/orderSchema");
const Food = require("../models/foodSchema");
const User = require("../models/userSchema");
const Restaurant = require("../models/restaurantSchema");
const Review = require("../models/reviewSchema");

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

const rateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { rating, reviewText } = req.body;

    const order = await Order.findById(orderId).populate("restaurant");

    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    const restaurant = order.restaurant;

    const newRating =
      (restaurant.rating * restaurant.ratingsAmount + rating) /
      (restaurant.ratingsAmount + 1);

    const newRatingsAmount = restaurant.ratingsAmount + 1;

    await Restaurant.findByIdAndUpdate(
      restaurant._id,
      { rating: newRating, ratingsAmount: newRatingsAmount },
      { new: true }
    );

    const newReview = await Review.create({
      user_id: req.user._id,
      order_id: orderId,
      rating: rating,
      review_text: reviewText,
    });

    await Order.findByIdAndUpdate(orderId, {
      isRated: true,
      review: newReview,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  deleteOrderById,
  updateOrderById,
  deleteAllOrders,
  rateOrder,
};
