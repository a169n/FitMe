const { Message } = require("../models/messageSchema");
const socketIo = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
  },
});

const getMessages = async (req, res) => {
  try {
    let messages;
    if (req.user?.isAdmin) {
      messages = await Message.find().sort({ timestamp: -1 });
    } else {
      messages = await Message.find({ sender: req.user._id }).sort({
        timestamp: -1,
      });
    }
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const createMessage = async (req, res) => {
  try {
    const { author, content, recipient, sender } = req.body;

    const message = await Message.create({
      author,
      content,
      recipient,
      sender,
    });

    io.emit("message", message);
    io.to(sender).to(recipient).emit("message", message);

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteMany({});
    res.status(200).json({ message: "Messages history cleared successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A client disconnect");
  });
});

module.exports = {
  getMessages,
  createMessage,
  deleteAllMessages,
};
