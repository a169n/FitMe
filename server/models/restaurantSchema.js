const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    name: String,
    address: String,
    description: String,
    region: String,
    rating: Number,
    keywords: [String],
    image: String,
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    collection: "restaurant",
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
