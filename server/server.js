// Module imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Middleware config
corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const { connectDB } = require("./config/db");

// Connect to MongoDB
connectDB();


app.use("/", require("./routes/testRouter"));
app.use("/", require("./routes/userRouter"));
app.use("/", require("./routes/restaurantRouter"));
app.use("/", require("./routes/foodRouter"));
app.use("/", require("./routes/categoryRouter"));
app.use("/", require("./routes/orderRouter"));
app.use("/", require("./routes/reviewRouter"));
app.use("/", require("./routes/deliveryRouter"));

// Localhost start
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);
