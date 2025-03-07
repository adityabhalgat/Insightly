const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    // Overall status: pending, approved, rejected, sold (when purchased)
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected', 'sold'], 
      default: 'pending' 
    },
    // ML classification: accepted (auto-approve), rejected, or mark_for_review (needs admin intervention)
    mlStatus: {
      type: String,
      enum: ['accepted', 'rejected', 'mark_for_review'],
      default: 'accepted'
    },
    // Only applicable if mlStatus is "mark_for_review"
    adminApprovalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    // Price at which the review is offered (business logic can determine this)
    reviewPrice: { type: Number, default: 0 },
    // (Optional) An array of purchase records can be referenced for quick lookup
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReviewPurchase' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);
