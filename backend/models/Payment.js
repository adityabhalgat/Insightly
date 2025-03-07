const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    payerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },    // The company
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The reviewer
    amount: { type: Number, required: true },
    transactionType: { 
      type: String, 
      enum: ['review_purchase', 'withdrawal'], 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'failed'], 
      default: 'pending' 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
