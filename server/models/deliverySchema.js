const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    address: String,
    status: String,
  },
  {
    timestamps: true,
    collection: "delivery",
  }
);

module.exports = mongoose.model("Delivery", deliverySchema);
