const Review = require('../../models/Review');

const listPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ adminApprovalStatus: 'pending' });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = listPendingReviews;
