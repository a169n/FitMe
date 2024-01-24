const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    name: String,
    address: String,
    description: String,
  },
  {
    collection: "restaurant",
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
