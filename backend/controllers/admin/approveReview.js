const Review = require('../../models/Review');

const approveReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    review.adminApprovalStatus = 'approved';
    review.status = 'approved';
    await review.save();
    res.json({ message: 'Review approved', review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = approveReview;
