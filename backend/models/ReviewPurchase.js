const mongoose = require('mongoose');

const ReviewPurchaseSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The purchasing company
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review', required: true },
    purchasePrice: { type: Number, required: true },
    // Company verification for the review's product:
    // pending: awaiting verification, verified: accepted, rejected: declined
    companyVerificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
    purchaseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ReviewPurchase', ReviewPurchaseSchema);
