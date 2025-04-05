const Review = require("../../models/Review"); // Ensure correct path to Review model

const getMarkedForReview = async (req, res) => {
  try {
    const reviews = await Review.find({ mlStatus: "mark_for_review" }).populate("productId");
    
    const formattedReviews = reviews.map((review) => ({
      id: review._id,
      title: review.productId?.name || "Unknown Product",
      category: review.productId?.category || "Unknown Category",
      brand: review.productId?.brand || "Unknown Brand",
      description: review.review,
      rating: review.rating,
      timeUsed: review.usageDuration,
      pros: review.pros,
      cons: review.cons,
      recommend: review.recommend,
      suggestions: review.suggestions || "No suggestions",
      submittedAt: review.createdAt.toISOString().split("T")[0], // Formatting date
      status: "marked for review",
    }));

    res.json(formattedReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {getMarkedForReview};