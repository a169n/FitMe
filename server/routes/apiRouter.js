const express = require("express");

const {
  getHealthQuotes,
} = require("../controllers/apiController");

const router = express.Router();

router.get("/health-quotes", getHealthQuotes);

module.exports = router;
