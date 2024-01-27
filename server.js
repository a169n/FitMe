// Mongoose schemas import
const User = require("./models/userSchema");
const Food = require("./models/foodSchema");
const Restaurant = require("./models/restaurantSchema");
const Category = require("./models/categorySchema");
const Order = require("./models/orderSchema");
const Review = require("./models/reviewSchema");
const Delivery = require("./models/deliverySchema");

// Module imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

// Middleware config
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

const { connectDB } = require("./config/db");

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/views/index.html");
});

app.use("/", require("./routes/testRouter"));
app.use("/", require("./routes/userRouter"));
app.use("/", require("./routes/restaurantRouter"));
app.use("/", require("./routes/foodRouter"));
app.use("/", require("./routes/categoryRouter"));
app.use("/", require("./routes/orderRouter"));
app.use("/", require("./routes/reviewRouter"));
app.use("/", require("./routes/deliveryRouter"));

// Localhost start
const port = process.env.PORT;

app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);
