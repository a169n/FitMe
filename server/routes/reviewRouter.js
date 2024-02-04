const express = require("express");
const {
  getAllReviews,
  getReviewById,
  deleteReviewById,
  createNewReview,
  updateReviewById,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/reviews", getAllReviews);
router.get("/review/:id", getReviewById);
router.post("/review", createNewReview);
router.put("/review/:id", updateReviewById);
router.delete("/review/:id", deleteReviewById);

module.exports = router;
