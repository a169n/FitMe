const User = require("../models/userSchema");
const Order = require("../models/orderSchema");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate("cart").populate("orders");
  res.status(200).json(users);
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true });
    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("cart")
    .populate("orders");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};

const getUserDetails = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate({
      path: "cart.product",
      populate: { path: "category" },
    });

    const orders = await Order.find({ user: userId }).populate({
      path: "review",
    });

    user.orders = orders;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserEmailByUsername = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error("Error finding user email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserById = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(updatedUser);
};

const makeUserAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isAdmin = true;
    await user.save();
    res.status(200).json({ message: "User is Admin now" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeUserAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isAdmin = false;
    await user.save();
    res.status(200).json({ message: "User is no longer an Admin" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUserById = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = {
  getAllUsers,
  getAllAdmins,
  getUserById,
  getUserDetails,
  getUserEmailByUsername,
  updateUserById,
  makeUserAdminById,
  removeUserAdminById,
  deleteUserById,
};
