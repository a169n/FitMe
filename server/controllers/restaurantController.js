const Restaurant = require("../models/restaurantSchema");
const fs = require("fs");

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}).populate("categories");
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNewRestaurant = async (req, res) => {
  const imagePath = req.file.path;
  const restaurant = await Restaurant.create({
    ...req.body,
    image: imagePath,
  });
  res.status(201).json(restaurant);
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      "categories"
    );
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchRestaurant = async (req, res) => {
  const { searchString } = req.query;

  const restaurants = await Restaurant.find({
    name: new RegExp(searchString, "i"),
  }).sort({ _id: -1 });

  res.status(200).json(restaurants);
};

const addImageToRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const imagePath = req.file.path;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.image.push(imagePath);

    const updatedRestaurant = await restaurant.save();

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({
      message: `Error adding image to restaurant with id ${id}`,
      error: error,
    });
  }
};

const updateRestaurantById = async (req, res) => {
  // console.log("req file => ", req.files);

  const { id } = req.params;

  try {
    let updates = req.body;

    if (req.files) {
      const imagePaths = req.files.map((file) => file.path);
      const restaurant = await Restaurant.findById(id);
      if (restaurant && restaurant.image) {
        const oldImagePaths = restaurant.image.map(
          (oldPath) => `./${oldPath.split("\\").join("/")}`
        );

        console.log("oldImagePaths => ", oldImagePaths);

        oldImagePaths.forEach((path) => {
          if (fs.existsSync(path)) {
            fs.unlinkSync(path);
          } else {
            console.error(`File does not exist: ${path}`);
          }
        });
      }
      updates.image = imagePaths;
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({
      message: `Error updating restaurant with id ${id}`,
      error: error,
    });
  }
};

const deleteRestaurantById = async (req, res) => {
  const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
  if (!deletedRestaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  res.status(200).json({ message: "Restaurant deleted successfully" });
};

const deleteAllRestaurants = async (req, res) => {
  try {
    await Restaurant.deleteMany({});
    res.status(200).json({ message: "All restaurants deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRestaurants,
  createNewRestaurant,
  searchRestaurant,
  getRestaurantById,
  addImageToRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
  deleteAllRestaurants,
};
