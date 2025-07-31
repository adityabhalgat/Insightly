const ReviewPurchase = require('../../models/ReviewPurchase');
const Review = require('../../models/Review');
const Company = require('../../models/company');

const createReviewPurchase = async (req, res) => {
  try {
    const { reviewId, purchasePrice } = req.body;
    const companyId = req.user.id; 
    
    const purchase = await ReviewPurchase.create({
      companyId,
      reviewId,
      purchasePrice,
      companyVerificationStatus: 'pending'
    });
    
    await Review.findByIdAndUpdate(reviewId, { $push: { purchases: purchase._id } });
    
    await Company.findByIdAndUpdate(companyId, { $push: { purchasedReviews: purchase._id } });
    
    res.status(201).json({ message: 'Review purchase initiated', purchase });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createReviewPurchase;
