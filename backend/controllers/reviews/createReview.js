const Review = require('../../models/Review');
const User = require('../../models/user');

// Dummy ML classification function – replace with your actual ML middleware/service
const mlClassifyReview = async (content) => {
  // For demonstration: if content length > 20, classify as accepted; else mark for review.
  return content.length > 20 ? 'accepted' : 'mark_for_review';
};

const createReview = async (req, res) => {
  try {
    const { productId, content, rating, reviewPrice } = req.body;
    
    // Determine review quality via ML
    const mlStatus = await mlClassifyReview(content);
    let status = 'pending';
    let adminApprovalStatus = 'pending';
    
    if (mlStatus === 'accepted') {
      status = 'approved';
      adminApprovalStatus = 'approved';
    } else if (mlStatus === 'rejected') {
      status = 'rejected';
      adminApprovalStatus = 'rejected';
    }
    
    // Create the review document with reference to the user
    const review = await Review.create({
      userId: req.user.id,    // req.user comes from authentication middleware (role 'user')
      productId,
      content,
      rating,
      reviewPrice,
      mlStatus,
      status,
      adminApprovalStatus,
    });
    
    // Update the user document to reflect the review given
    await User.findByIdAndUpdate(req.user.id, { 
      $push: { reviews: review._id },
      $inc: { totalReviewsWritten: 1 }
    });
    
    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createReview;
