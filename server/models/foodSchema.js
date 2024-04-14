const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    image: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    globalCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GlobalCategory",
    },
  },
  {
    collection: "food",
  }
);

module.exports = mongoose.model("Food", foodSchema);
