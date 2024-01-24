const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant"
    },
    foods_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food"
    }]
  },
  {
    timestamps: true,
    collection: "order",
  }
);

module.exports = mongoose.model("Order", orderSchema);
