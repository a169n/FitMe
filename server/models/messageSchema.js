const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: String,
  sender: String,
  recipient: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message };
