// Mongoose schemas import
const User = require("../models/userSchema");
const Food = require("../models/foodSchema");
const Restaurant = require("../models/restaurantSchema");
const Category = require("../models/categorySchema");
const Order = require("../models/orderSchema");
const Review = require("../models/reviewSchema");

const showAll = async (req, res) => {
  const users = await User.find({});
  const foods = await Food.find({});
  const restaurants = await Restaurant.find({});
  const categories = await Category.find({});
  const orders = await Order.find({});
  const reviews = await Review.find({});

  const allData = {
    users,
    foods,
    restaurants,
    categories,
    orders,
    reviews,
  };

  res.status(200).json(allData);
};

module.exports = { showAll };
