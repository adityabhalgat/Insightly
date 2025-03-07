const Review = require('../../models/Review');

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    // Prevent deletion if review has been sold
    if (review.status === 'sold') return res.status(400).json({ error: 'Sold review cannot be deleted' });
    await review.remove();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteReview;
