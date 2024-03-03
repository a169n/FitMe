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
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/user/email", getUserEmailByUsername);
router.get("/users/search", searchUsers);
router.get("/user/:id", getUserById);
router.post("/user", createNewUser);
router.put("/user/:id", updateUserById);
router.put("/user/:id/make-admin", makeUserAdminById);
router.put("/user/:id/remove-admin", removeUserAdminById);
router.delete("/user/:id", deleteUserById);

module.exports = router;
