const User = require("../models/userSchema");

const addItemToCart = async (req, res) => {
  try {
    const reqUser = req.user;
    const { productId, amount, restaurantId } = req.body;

    const user = await User.findById(reqUser._id);

    if (
      user.cartRestaurant &&
      user.cartRestaurant.toString() !== restaurantId
    ) {
      user.cart = [];
    }

    user.cartRestaurant = restaurantId;

    user.cart.push({ product: productId, amount: amount });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeItemAmountByOne = async (req, res) => {
  try {
    const reqUser = req.user;
    const { productId, increase } = req.body;

    if (!reqUser) {
      return res.status(400).json({ message: "User not found in request" });
    }

    const user = await User.findById(reqUser._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (increase) {
      user.cart[productIndex].amount += 1;
    } else {
      user.cart[productIndex].amount = Math.max(
        user.cart[productIndex].amount - 1,
        0
      );
    }

    await user.save();

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

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
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
        $set: { cart: [], cartRestaurant: null },
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
  changeItemAmountByOne,
  removeItemFromCart,
  getItemsNumberInCart,
  clearCart,
};
