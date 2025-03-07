const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    // Log type: credits add money to balance; debits subtract money (e.g., review purchase payments)
    type: { type: String, enum: ['credit', 'debit'], required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
