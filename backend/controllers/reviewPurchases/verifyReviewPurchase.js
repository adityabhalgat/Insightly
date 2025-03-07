const ReviewPurchase = require('../../models/ReviewPurchase');
const Payment = require('../../models/Payment');
const Review = require('../../models/Review');

const verifyReviewPurchase = async (req, res) => {
  try {
    const { purchaseId, verificationStatus } = req.body; // 'verified' or 'rejected'
    const purchase = await ReviewPurchase.findById(purchaseId);
    if (!purchase) return res.status(404).json({ error: 'Purchase not found' });
    purchase.companyVerificationStatus = verificationStatus;
    await purchase.save();

    if (verificationStatus === 'verified') {
      // Trigger payment: get the reviewer from the review record
      const review = await Review.findById(purchase.reviewId);
      if (!review) return res.status(404).json({ error: 'Review not found' });
      const payment = await Payment.create({
        payerId: req.user.id, // company id
        receiverId: review.userId,
        amount: purchase.purchasePrice,
        transactionType: 'review_purchase',
        status: 'pending'
      });
      res.json({ message: 'Purchase verified and payment initiated', purchase, payment });
    } else {
      res.json({ message: 'Purchase rejected', purchase });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = verifyReviewPurchase;
