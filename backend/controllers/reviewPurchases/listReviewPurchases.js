const ReviewPurchase = require('../../models/ReviewPurchase');

const listReviewPurchases = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === 'company') {
      filter.companyId = req.user.id;
    }
    const purchases = await ReviewPurchase.find(filter).populate('reviewId');
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = listReviewPurchases;
