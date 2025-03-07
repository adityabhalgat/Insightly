const Review = require('../../models/Review');

const rejectReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { reason } = req.body;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    review.adminApprovalStatus = 'rejected';
    review.status = 'rejected';
    // Optionally store rejection reason
    review.rejectionReason = reason;
    await review.save();
    res.json({ message: 'Review rejected', review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = rejectReview;
