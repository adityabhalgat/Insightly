const Review = require('../../models/Review');

const getReviews = async (req, res) => {
  try {
    const { productId, status } = req.query;
    const filter = {};
    if (productId) filter.productId = productId;
    if (status) filter.status = status;
    const reviews = await Review.find(filter);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getReviews;
