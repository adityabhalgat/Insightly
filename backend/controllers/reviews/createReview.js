const jwt = require('jsonwebtoken');
const Review = require('../../models/Review');
const User = require('../../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Ensure this is stored securely

// Placeholder function for ML classification - Replace with actual ML logic
const mlClassifyReview = async (content) => {
  if (content.length > 50) return 'accepted';
  if (content.length > 20) return 'mark_for_review';
  return 'rejected';
};

const createReview = async (req, res) => {
  try {
    // Retrieve user ID from JWT
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    const userId = decoded.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token data' });
    }

    const { productId, rating, usageDuration, pros, cons, recommend, review, productSequenceNumber, reviewPrice = 50, suggestions } = req.body;

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({ userId, productId });
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product.' });
    }

    // Determine review quality via ML
    const mlStatus = await mlClassifyReview(review);
    let status, adminApprovalStatus;

    if (mlStatus === 'accepted') {
      status = 'approved';
      adminApprovalStatus = 'approved';
    } else if (mlStatus === 'mark_for_review') {
      status = 'pending';
      adminApprovalStatus = 'pending';
    } else {
      status = 'rejected';
      adminApprovalStatus = 'rejected';
    }

    // Create the review document
    const newReview = await Review.create({
      userId,
      productId,
      productSequenceNumber,
      rating,
      usageDuration,
      pros,
      cons,
      recommend,
      review,
      reviewPrice,
      mlStatus,
      status,
      adminApprovalStatus,
      suggestions,
    });

    // Update the user document with the new review
    const userUpdate = await User.findByIdAndUpdate(userId, {
      $push: { reviews: newReview._id },
      $inc: { totalReviewsWritten: 1 }
    }, { new: true });

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ error: 'User does not exist' });
    }


    if (!userUpdate) {
      return res.status(500).json({ error: 'Failed to update user data' });
    }

    res.status(201).json({ message: 'Review created successfully', review: newReview });

  } catch (error) {
    console.error('Error in createReview:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};

module.exports = createReview;
