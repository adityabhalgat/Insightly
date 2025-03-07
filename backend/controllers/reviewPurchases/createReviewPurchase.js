const ReviewPurchase = require('../../models/ReviewPurchase');
const Review = require('../../models/Review');
const Company = require('../../models/company');

const createReviewPurchase = async (req, res) => {
  try {
    const { reviewId, purchasePrice } = req.body;
    const companyId = req.user.id;  // Here, req.user is a company (authenticated via separate company auth)
    
    // Create a purchase record
    const purchase = await ReviewPurchase.create({
      companyId,
      reviewId,
      purchasePrice,
      companyVerificationStatus: 'pending'
    });
    
    // Update the Review to include this purchase reference
    await Review.findByIdAndUpdate(reviewId, { $push: { purchases: purchase._id } });
    
    // Update the Company document to track this purchase
    await Company.findByIdAndUpdate(companyId, { $push: { purchasedReviews: purchase._id } });
    
    res.status(201).json({ message: 'Review purchase initiated', purchase });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createReviewPurchase;
