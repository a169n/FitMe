const express = require("express");
const {
  getAllDeliveries,
  getDeliveryById,
  deleteDeliveryById,
  createNewDelivery,
  updateDeliveryById,
} = require("../controllers/deliveryController");

const router = express.Router();

router.get("/deliveries", getAllDeliveries);
router.get("/delivery/:id", getDeliveryById);
router.post("/delivery", createNewDelivery);
router.put("/delivery/:id", updateDeliveryById);
router.delete("/delivery/:id", deleteDeliveryById);

module.exports = router;
