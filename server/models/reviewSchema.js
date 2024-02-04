const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    food_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
    rating: Number,
    review_text: String,
  },
  {
    timestamps: true,
    collection: "review",
  }
);

module.exports = mongoose.model("Review", reviewSchema);
