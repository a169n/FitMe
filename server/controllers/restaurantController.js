const Restaurant = require("../models/restaurantSchema");
const Category = require("../models/categorySchema");
const Food = require("../models/foodSchema");

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
  const imagePaths = req.files.map((file) => file.path);
  try {
    const restaurant = await Restaurant.create({
      ...req.body,
      images: imagePaths,
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
  const { searchString, page = 1, limit = 6 } = req.query;
  const count = await Restaurant.countDocuments({
    $or: [
      { name: new RegExp(searchString, "i") },
      { description: new RegExp(searchString, "i") },
    ],
  });
  const restaurants = await Restaurant.find({
    $or: [
      { name: new RegExp(searchString, "i") },
      { description: new RegExp(searchString, "i") },
    ],
  })
    .sort({ _id: -1 })
    .limit(+limit)
    .skip((page - 1) * limit);
  res
    .status(200)
    .json({ data: restaurants, totalPages: Math.ceil(count / limit) });
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
  const { id } = req.params;

  try {
    let updates = req.body;

    if (req.files) {
      const imagePaths = req.files.map((file) => file.path);
      const restaurant = await Restaurant.findById(id);
      if (restaurant) {
        const oldImagePaths = restaurant.images.map(
          (oldPath) => `./${oldPath.split("\\").join("/")}`
        );

        oldImagePaths.forEach((path) => {
          console.log("Path:", path);
          if (fs.existsSync(path)) {
            fs.unlinkSync(path);
          } else {
            console.error(`File does not exist: ${path}`);
          }
        });
      }
      updates = { ...updates, images: imagePaths };
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
      error: error.message,
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
    await Food.deleteMany({ restaurant: { $exists: true } });

    await Category.deleteMany({ restaurant: { $exists: true } });

    await Restaurant.deleteMany({});

    res.status(200).json({
      message: "All restaurants, categories, and foods deleted successfully",
    });
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
