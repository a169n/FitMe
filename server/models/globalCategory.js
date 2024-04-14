const mongoose = require("mongoose");

const globalCategorySchema = mongoose.Schema(
  {
    name: String,
    image: String,
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
      },
    ],
  },
  {
    collection: "globalCategory",
  }
);

module.exports = mongoose.model("GlobalCategory", globalCategorySchema);
