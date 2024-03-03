const express = require("express");

const {
  getExercisesByMuscle,
  getRecipesByQuery,
  getHealthQuotes,
} = require("../controllers/apiController");

const router = express.Router();

router.get("/exercises", getExercisesByMuscle);
router.get("/recipes", getRecipesByQuery);
router.get("/health-quotes", getHealthQuotes);

module.exports = router;
