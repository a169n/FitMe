const Review = require("../models/reviewSchema");

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});
  res.status(200).json(reviews);
};

const getReviewById = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  res.status(200).json(review);
};

const deleteReviewById = async (req, res) => {
  const deletedReview = await Review.findByIdAndDelete(req.params.id);
  if (!deletedReview) {
    return res.status(404).json({ message: "Review not found" });
  }
  res.status(200).json({ message: "Review deleted successfully" });
};

const createNewReview = async (req, res) => {
  const newReview = await Review.create(req.body);
  res.status(201).json(newReview);
};

const updateReviewById = async (req, res) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!updatedReview) {
    return res.status(404).json({ message: "Review not found" });
  }
  res.status(200).json(updatedReview);
};

module.exports = {
  getAllReviews,
  getReviewById,
  deleteReviewById,
  createNewReview,
  updateReviewById,
};
