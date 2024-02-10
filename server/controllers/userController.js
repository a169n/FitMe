const User = require("../models/userSchema");

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

const createNewUser = async (req, res) => {
  const newUser = await User.create(req.body)
  res.json(newUser);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
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
  getAllUsers,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
