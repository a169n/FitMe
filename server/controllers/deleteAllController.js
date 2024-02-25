// Mongoose schemas import
const User = require("../models/userSchema");
const Food = require("../models/foodSchema");
const Restaurant = require("../models/restaurantSchema");
const Category = require("../models/categorySchema");
const Order = require("../models/orderSchema");
const Review = require("../models/reviewSchema");

const deleteAll = async (req, res) => {
  await User.deleteMany({});
  await Food.deleteMany({});
  await Restaurant.deleteMany({});
  await Category.deleteMany({});
  await Order.deleteMany({});
  await Review.deleteMany({});

  res.status(200).json({ message: "All data cleared successfully" });
};

module.exports = { deleteAll };
