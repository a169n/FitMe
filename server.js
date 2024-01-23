// Module imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();


const { connectDB } = require("./config/db");


// Middleware config
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

// Connect to MongoDB
connectDB();


app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/views/index.html")
})

// Localhost start
const port = process.env.PORT;

app.listen(port, () =>
  console.log(`The server is up and running on http://localhost:${port}/`)
);