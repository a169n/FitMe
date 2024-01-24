const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
  },
  {
    collection: "food",
  }
);

module.exports = mongoose.model("Food", foodSchema);
