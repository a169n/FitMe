const express = require("express");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  createNewUser,
  updateUserById,
  searchUsers,
  makeUserAdminById,
  removeUserAdminById,
  getUserEmailByUsername,
  addItemToCart,
  getItemsNumberInCart,
  postGetUserProfile,
  getUserDetails,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/user/email", getUserEmailByUsername);
router.get("/users/search", searchUsers);
router.get("/user/:id", getUserById);
router.post("/user", createNewUser);
router.get("/user/details/:id", getUserDetails);
router.get("/user/profile", postGetUserProfile);
router.post("/cart", addItemToCart);
router.get("/user/:id/cart/amount", getItemsNumberInCart);
router.put("/user/:id", updateUserById);
router.put("/user/:id/make-admin", makeUserAdminById);
router.put("/user/:id/remove-admin", removeUserAdminById);
router.delete("/user/:id", deleteUserById);

module.exports = router;
