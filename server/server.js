// Module imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Middleware config
const corsOptions = {
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
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
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

app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);
