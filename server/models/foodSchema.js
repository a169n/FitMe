const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  {
    collection: "food",
  }
);

module.exports = mongoose.model("Food", foodSchema);
