// Mongoose schemas import
const User = require("../models/userSchema");
const Food = require("../models/foodSchema");
const Restaurant = require("../models/restaurantSchema");
const Category = require("../models/categorySchema");
const Order = require("../models/orderSchema");
const Review = require("../models/reviewSchema");
const Delivery = require("../models/deliverySchema");

const mongoose = require("mongoose");

const populate = async (req, res) => {
  const user1 = await User.create({
    username: "user1",
    password: "password1",
    email: "user1@example.com",
  });

  const user2 = await User.create({
    username: "user2",
    password: "password2",
    email: "user2@example.com",
  });

  const restaurant1 = await Restaurant.create({
    name: "Restaurant A",
    address: "123 Main St",
    description: "Delicious dishes",
  });

  const restaurant2 = await Restaurant.create({
    name: "Restaurant B",
    address: "456 Oak St",
    description: "Exquisite cuisine",
  });

  const category1 = await Category.create({
    name: "Italian",
    restaurant_id: restaurant1._id,
  });

  const category2 = await Category.create({
    name: "American",
    restaurant_id: restaurant2._id,
  });

  const food1 = await Food.create({
    name: "Pizza",
    price: 10.99,
    description: "Cheese, tomato sauce, and pepperoni",
    category: category1._id,
    restaurant: restaurant1._id,
  });

  const food2 = await Food.create({
    name: "Burger",
    price: 8.99,
    description: "Beef patty, lettuce, and tomato",
    category: category2._id,
    restaurant: restaurant2._id,
  });

  const order1 = await Order.create({
    user_id: user1._id,
    restaurant_id: restaurant1._id,
    foods_id: [food1._id, food2._id],
  });
  const order2 = await Order.create({
    user_id: user2._id,
    restaurant_id: restaurant2._id,
    foods_id: [food2._id],
  });

  const review1 = await Review.create({
    user_id: user1._id,
    restaurant_id: restaurant1._id,
    food_id: food1._id,
    rating: 4,
    review_text: "Great pizza!",
  });
  const review2 = await Review.create({
    user_id: user2._id,
    restaurant_id: restaurant2._id,
    food_id: food2._id,
    rating: 5,
    review_text: "Amazing burger!",
  });

  const delivery1 = await Delivery.create({
    order_id: order1._id,
    address: "789 Elm St",
    status: "Delivered",
  });
  const delivery2 = await Delivery.create({
    order_id: order2._id,
    address: "101 Pine St",
    status: "In transit",
  });

  res.status(201).json({ message: "Sample data populated successfully" });
};

module.exports = { populate };
