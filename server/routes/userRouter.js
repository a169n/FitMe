const express = require("express");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  createNewUser,
  updateUserById,
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.post("user", createNewUser);
router.put("/user/:id", updateUserById);
router.delete("/user/:id", deleteUserById);

module.exports = router;
