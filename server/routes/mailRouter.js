const express = require("express");
const {
  mailOnLogin,
  mailOnRegister,
} = require("../controllers/mailController");

const router = express.Router();

router.post("/mail/register", mailOnRegister);
router.post("/mail/login", mailOnLogin);

module.exports = router;
