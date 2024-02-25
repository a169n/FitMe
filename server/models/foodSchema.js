const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    image: String,
    globalCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GlobalCategory",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  {
    collection: "food",
  }
);

module.exports = mongoose.model("Food", foodSchema);
