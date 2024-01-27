const Delivery = require("../models/deliverySchema");

const getAllDeliveries = async (req, res) => {
  const deliveries = await Delivery.find({});
  res.status(200).json(deliveries);
};

const getDeliveryById = async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);
  if (!delivery) {
    return res.status(404).json({ message: "Delivery not found" });
  }
  res.status(200).json(delivery);
};

const deleteDeliveryById = async (req, res) => {
  const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id);
  if (!deletedDelivery) {
    return res.status(404).json({ message: "Delivery not found" });
  }
  res.status(200).json({ message: "Delivery deleted successfully" });
};

const createNewDelivery = async (req, res) => {
  const newDelivery = await Delivery.create(req.body);
  res.status(201).json(newDelivery);
};

const updateDeliveryById = async (req, res) => {
  const updatedDelivery = await Delivery.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!updatedDelivery) {
    return res.status(404).json({ message: "Delivery not found" });
  }
  res.status(200).json(updatedDelivery);
};

module.exports = {
  getAllDeliveries,
  getDeliveryById,
  deleteDeliveryById,
  createNewDelivery,
  updateDeliveryById,
};
