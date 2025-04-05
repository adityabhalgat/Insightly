const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },

    // Rating (1-5 stars)
    rating: { type: Number, min: 1, max: 5, required: true },

    // User input fields
    usageDuration: { type: String, required: true },
    pros: { type: String, required: true },
    cons: { type: String, required: true },
    recommend: { type: Boolean, required: true },
    review: { type: String, required: true },
    productSequenceNumber: { type: String, required: true },
    suggestions: { type: String , required: false },

    // Review status tracking
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'rejected', 'marked for review'], 
      default: 'pending' 
    },

    // AI moderation for review validation
    mlStatus: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'mark_for_review'],
      default: 'pending'
    },

    // Admin approval status (if marked for review)
    adminApprovalStatus: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },

    // Reward system for incentivizing reviews
    reviewPrice: { type: Number, default: 0 }, 

    // Linking purchases (if applicable)
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReviewPurchase' }],

  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);
