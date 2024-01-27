const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    name: String,
    address: String,
    description: String,
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }],
    foods: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food"
    }]
  },
  {
    collection: "restaurant",
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
