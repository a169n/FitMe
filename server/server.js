// Module imports
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A client disconnect");
  });
});

// Serving static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "../client")));

const { connectDB } = require("./config/db");
const { Message } = require("./models/messageSchema");

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/messages", async (req, res) => {
  try {
    console.log(req.body);
    const { author, content } = req.body;
    const message = await Message.create({ author, content });
    io.emit("message", message);
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/auth", require("./routes/authRoutes"));
app.use("/", require("./routes/testRouter"));
app.use("/", require("./routes/userRouter"));
app.use("/", require("./routes/restaurantRouter"));
app.use("/", require("./routes/foodRouter"));
app.use("/", require("./routes/categoryRouter"));
app.use("/", require("./routes/globalCategoryRoutes"));
app.use("/", require("./routes/orderRouter"));
app.use("/", require("./routes/reviewRouter"));
app.use("/", require("./routes/apiRouter"));
app.use("/", require("./routes/mailRouter"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Localhost start
const port = process.env.PORT || 3000;

server.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);
