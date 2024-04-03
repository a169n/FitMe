const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    name: String,
    address: String,
    description: String,
    region: String,
    rating: {
      type: Number,
      default: 0,
    },
    ratingsAmount: {
      type: Number,
      default: 0,
    },
    keywords: [String],
    images: [String],
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
