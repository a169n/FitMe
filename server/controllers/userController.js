const User = require("../models/userSchema");
const Order = require("../models/orderSchema");

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

const createNewUser = async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
};

const addItemToCart = async (req, res) => {
  try {
    const reqUser = req.user;
    const { productId, amount } = req.body;
    const user = await User.findByIdAndUpdate(
      reqUser._id,
      {
        $push: { cart: { product: productId, amount: amount } },
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItemsNumberInCart = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: `User with id ${id} not found` });
    }
    res.status(200).json({ amount: user.cart.length });
  } catch (error) {
    console.error("Error fetching cart items count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .select("-password")
      .populate("cart.food");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const orders = await Order.find({ user: id }).populate("orderProducts.food");
    user.orders = orders;
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const postGetUserProfile = async (req, res) => {
  const { userId } = req.params;

  const { reqUserId } = req.body;

  if (userId && reqUserId && userId !== reqUserId) {
    res.status(200).json({ message: "You don't have access to this profile" });
  }

  const user = await User.findById(userId);

  res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
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

const searchUsers = async (req, res) => {
  const { searchString } = req.query;

  const users = await User.find({
    $or: [
      { name: new RegExp(searchString, "i") },
      { jobTitle: new RegExp(searchString, "i") },
    ],
  });

  res.status(200).json(users);
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

const deleteUserById = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = {
  addItemToCart,
  getAllUsers,
  getUserDetails,
  postGetUserProfile,
  getUserEmailByUsername,
  getItemsNumberInCart,
  searchUsers,
  createNewUser,
  makeUserAdminById,
  removeUserAdminById,
  getUserById,
  updateUserById,
  deleteUserById,
};
