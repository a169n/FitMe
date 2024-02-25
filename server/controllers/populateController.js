const User = require("../models/userSchema");
const Food = require("../models/foodSchema");
const Restaurant = require("../models/restaurantSchema");
const Category = require("../models/categorySchema");
const Order = require("../models/orderSchema");
const Review = require("../models/reviewSchema");

const populate = async (req, res) => {
  try {
    // Create users
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

    // Create restaurants
    const restaurant1 = await Restaurant.create({
      name: "Kazakh Kitchen",
      address: "123 Abay Avenue, Astana, Kazakhstan",
      description: "Traditional Kazakh cuisine in the heart of Astana.",
      region: "Astana",
      rating: 4.0,
      keywords: ["healthy food", "salads"],
    });

    const restaurant2 = await Restaurant.create({
      name: "Sultan's Palace",
      address: "456 Nurzhol Boulevard, Astana, Kazakhstan",
      description:
        "Fine dining experience with a blend of Kazakh and international flavors.",
      rating: 3.2,
      region: "Astana",
      keywords: ["fast-food"],
    });

    const restaurant3 = await Restaurant.create({
      name: "Kazakh Kitchen",
      address: "123 Abay Avenue, Astana, Kazakhstan",
      description: "Traditional Kazakh cuisine in the heart of Astana.",
      region: "Astana",
      rating: 4.5,
      keywords: ["asian", "indian"],
    });

    const restaurant4 = await Restaurant.create({
      name: "Sultan's Palace",
      address: "456 Nurzhol Boulevard, Astana, Kazakhstan",
      description:
        "Fine dining experience with a blend of Kazakh and international flavors.",
      rating: 4.8,
      region: "Astana",
      keywords: ["traditional chinese", "indian"],
    });

    // Create categories
    const category1 = await Category.create({
      name: "Main Course",
      restaurant_id: restaurant1._id,
    });

    const category2 = await Category.create({
      name: "Appetizers",
      restaurant_id: restaurant2._id,
    });

    const category3 = await Category.create({
      name: "Dessert",
      restaurant_id: restaurant3._id,
    });

    const category4 = await Category.create({
      name: "Soda",
      restaurant_id: restaurant4._id,
    });

    // Create foods
    const food1 = await Food.create({
      name: "Beshbarmak",
      price: 15.99,
      description: "Traditional Kazakh dish with boiled meat and noodles.",
      category_id: category1._id,
    });

    const food2 = await Food.create({
      name: "Samsa",
      price: 8.99,
      description: "Savory pastry filled with minced meat and onions.",
      category_id: category2._id,
    });

    const food3 = await Food.create({
      name: "Cake",
      price: 7.99,
      description: "Normal cake",
      category_id: category3._id,
    });

    const food4 = await Food.create({
      name: "Coke",
      price: 1.99,
      description: "Classic",
      category_id: category4._id,
    });

    // Create orders
    const order1 = await Order.create({
      user_id: user1._id,
      restaurant_id: restaurant1._id,
      foods_id: [food1._id, food3._id, food4._id],
    });

    const order2 = await Order.create({
      user_id: user2._id,
      restaurant_id: restaurant2._id,
      foods_id: [food1._id, food2._id, food3._id, food4._id],
    });

    // Create reviews
    const review1 = await Review.create({
      user_id: user1._id,
      order_id: order1._id,
      rating: 4,
      review_text: "The Beshbarmak was delicious!",
    });

    const review2 = await Review.create({
      user_id: user2._id,
      order_id: order2._id,
      rating: 5,
      review_text: "Samsa was amazing!",
    });

    // Create deliveries
    
    res.status(201).json({ message: "Sample data populated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to populate sample data" });
  }
};

module.exports = { populate };
