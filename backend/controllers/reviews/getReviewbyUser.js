const Review = require("../../models/Review");
const User = require("../../models/user");
const mongoose = require("mongoose");

const getUserReviews = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from route parameter

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID format"
      });
    }

    // Find user first to verify they exist
    const user = await User.findById(id)
      .populate({
        path: 'reviews',
        populate: [
          { path: 'userId', select: 'username email' },
          { path: 'productId', select: 'name description' }
        ],
        options: { sort: { createdAt: -1 } }
      })
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    console.log(`Found ${user.reviews.length} reviews for user ${id}`);

    return res.status(200).json({
      success: true,
      count: user.reviews.length,
      reviews: user.reviews
    });

  } catch (error) {
    console.error('Error in getUserReviews:', error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch reviews",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = getUserReviews;
