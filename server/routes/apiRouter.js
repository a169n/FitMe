const express = require("express");

const {
  getExercisesByMuscle,
  getRecipesByQuery,
} = require("../controllers/apiController");

const router = express.Router();

router.get("/exercises", getExercisesByMuscle);
router.get("/recipes", getRecipesByQuery);

module.exports = router;
