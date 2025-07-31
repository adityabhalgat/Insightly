const Review = require('../../models/Review');

const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (req.body.status && (req.body.status === 'accepted' || req.body.status === 'rejected')) {
      review.status = req.body.status;
      review.mlStatus = req.body.status; 
      await review.save();
      return res.json({ message: 'Review status updated successfully', review });
    }

    if (review.status !== 'pending') {
      return res.status(400).json({ error: 'Review cannot be updated' });
    }

    Object.assign(review, req.body);
    await review.save();
    res.json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateReview;
