const mongoose = require('mongoose');

const SubscriptionPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    durationInDays: { type: Number, required: true },
    premiumFeatures: {
      advancedAnalytics: { type: Boolean, default: false },
      earlyAccess: { type: Boolean, default: false },
      discountRate: { type: Number, default: 0 }, // Percentage discount on review purchases
      additionalFormCustomization: { type: Boolean, default: false },
      apiAccess: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);
