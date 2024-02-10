const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    foods_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    }],
    address: String,
    status: String,
  },
  {
    timestamps: true,
    collection: "delivery",
  }
);

module.exports = mongoose.model("Delivery", deliverySchema);
