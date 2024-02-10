const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
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
