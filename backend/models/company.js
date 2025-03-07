const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  customForms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomForm' }],
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CompanySubscription' }],
  purchasedReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReviewPurchase' }], // Track review purchases
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
