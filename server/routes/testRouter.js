const express = require("express");
const router = express.Router();

const { showAll } = require("../controllers/showAllController");
const { deleteAll } = require("../controllers/deleteAllController");
const { populate } = require("../controllers/populateController");

router.get("/show", showAll);
router.delete("/clear", deleteAll);
router.post("/populate", populate);

module.exports = router;
