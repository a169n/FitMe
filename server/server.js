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
    methods: ["GET", "POST", "DELETE"],
  },
});

corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serving static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "../client")));

const { connectDB } = require("./config/db");

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/", require("./routes/userRouter"));
app.use("/cart", require("./routes/cartRouter"));
app.use("/", require("./routes/restaurantRouter"));
app.use("/", require("./routes/foodRouter"));
app.use("/", require("./routes/categoryRouter"));
app.use("/", require("./routes/globalCategoryRoutes"));
app.use("/", require("./routes/orderRouter"));
app.use("/", require("./routes/reviewRouter"));
app.use("/", require("./routes/apiRouter"));
app.use("/", require("./routes/mailRouter"));
app.use("/", require("./routes/messagesRouter"));

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
