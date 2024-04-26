const express = require("express");

const {
  getAllUsers,
  getUserEmailByUsername,
  searchUsers,
  getUserById,
  getUserDetails,
  updateUserById,
  makeUserAdminById,
  removeUserAdminById,
  deleteUserById,
  getAllAdmins,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/admins", getAllAdmins);
router.get("/user/:id", getUserById);
router.get("/user/:id/details", getUserDetails);
router.post("/user/email", getUserEmailByUsername);
router.put("/user/:id", protect, updateUserById);
router.put("/user/:id/make-admin", makeUserAdminById);
router.put("/user/:id/remove-admin", removeUserAdminById);
router.delete("/user/:id", protect, deleteUserById);

module.exports = router;
