const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email:    { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  balance:  { type: Number, default: 0 },
  reviews:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],  // Track reviews given by the user
  isVerified: { type: Boolean, default: false },
  totalReviewsWritten: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
