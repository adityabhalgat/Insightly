const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isUpiUpdated: {
    type: Boolean,
    default: false
  },

  upiId: {
    type: String,
    unique: true,
    sparse: true
  },

  totalReviews: {
    type: Number,
    default: 0
  },

  reviews: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    }
  ]

})

// table - Admins
module.exports = mongoose.model('Users', adminSchema, 'Users');
