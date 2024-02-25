const mongoose = require("mongoose");

const globalCategorySchema = mongoose.Schema(
  {
    name: String,
    image: String,
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    collection: "food",
  }
);

module.exports = mongoose.model("GlobalCategory", globalCategorySchema);
