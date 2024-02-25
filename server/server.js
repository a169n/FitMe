// Module imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Middleware config
corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const { connectDB } = require("./config/db");

// Connect to MongoDB
connectDB();

app.use("/auth", require("./routes/authRoutes"));
app.use("/", require("./routes/testRouter"));
app.use("/", require("./routes/userRouter"));
app.use("/", require("./routes/restaurantRouter"));
app.use("/", require("./routes/foodRouter"));
app.use("/", require("./routes/categoryRouter"));
app.use("/", require("./routes/globalCategoryRoutes"));
app.use("/", require("./routes/orderRouter"));
app.use("/", require("./routes/reviewRouter"));

// Localhost start
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);
