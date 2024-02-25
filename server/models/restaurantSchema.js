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
    foods_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
  },
  {
    collection: "restaurant",
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
