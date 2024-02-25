const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: String,
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
  },
  {
    timestamps: true,
    collection: "category",
  }
);

module.exports = mongoose.model("Category", categorySchema);
