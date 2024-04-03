const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    orderProducts: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
        amount: Number,
      },
    ], 
    totalSum: Number,
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    deliveryAddress: String,
    deliveryStatus: String,
  },
  {
    timestamps: true,
    collection: "order",
  }
);

module.exports = mongoose.model("Order", orderSchema);
