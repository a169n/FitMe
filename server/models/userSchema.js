const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    age: Number,
    isMale: Boolean,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cartRestaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
        amount: Number,
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);
