const Review = require("../models/reviewSchema");
const Order = require("../models/orderSchema");
const Restaurant = require("../models/restaurantSchema");

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

const rateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { rating, reviewText } = req.body;

    const order = await Order.findById(orderId).populate("restaurant");

    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    const restaurant = order.restaurant;

    const newRating =
      (restaurant.rating * restaurant.ratingsAmount + rating) /
      (restaurant.ratingsAmount + 1);

    const newRatingsAmount = restaurant.ratingsAmount + 1;

    await Restaurant.findByIdAndUpdate(
      restaurant._id,
      { rating: newRating, ratingsAmount: newRatingsAmount },
      { new: true }
    );

    const newReview = await Review.create({
      user_id: req.user._id,
      order_id: orderId,
      rating: rating,
      review_text: reviewText,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const calculateAverageRating = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    const orders = await Order.find({ restaurant: restaurantId }).populate(
      "review"
    );

    let totalRating = 0;
    let totalOrdersWithRating = 0;

    orders.forEach((order) => {
      if (order.review) {
        totalRating += order.review.rating;
        totalOrdersWithRating++;
      }
    });

    const averageRating = totalRating / totalOrdersWithRating;

    res.status(200).json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  deleteReviewById,
  createNewReview,
  updateReviewById,

  rateOrder,
  calculateAverageRating,
};
