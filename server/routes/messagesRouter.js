const express = require("express");
const {
  getMessages,
  createMessage,
  deleteAllMessages,
} = require("../controllers/messagesController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/messages", protect, getMessages);
router.post("/messages", protect, createMessage);
router.delete("/messages", deleteAllMessages);

module.exports = router;
