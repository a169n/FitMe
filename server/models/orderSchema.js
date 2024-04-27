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
    isRated: {
      type: Boolean,
      default: false,
    },
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    deliveryAddress: String,
    deliveryStatus: {
      type: String,
      enum: ["Delivering", "Delivered", "Canceled"],
      default: "Delivering"
    },
  },
  {
    timestamps: true,
    collection: "order",
  }
);

module.exports = mongoose.model("Order", orderSchema);
