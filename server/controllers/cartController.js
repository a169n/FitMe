const User = require("../models/userSchema");

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

const removeItemFromCart = async (req, res) => {
  try {
    const reqUser = req.user;
    const { productId } = req.body;
    const user = await User.findByIdAndUpdate(
      reqUser._id,
      {
        $pull: { cart: { product: productId } },
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: JSON.stringify(error) });
  }
};

const getItemsNumberInCart = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user)
    res.status(500).json({ message: `User with id ${req.user._id} not found` });

  res.status(200).json({ amount: user.cart.length });
};

const clearCart = async (req, res) => {
  try {
    const reqUser = req.user;
    const user = await User.findByIdAndUpdate(
      reqUser._id,
      {
        $set: { cart: [] },
      },
      { new: true }
    );

    res.status(200).json({ message: "Cart cleared successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  getItemsNumberInCart,
  clearCart,
};
