const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: { 
    type: String, 
    enum: ['superadmin', 'moderator'], 
    default: 'moderator',
    required: true
  },
})

// table - Admins
module.exports = mongoose.model('Admins', adminSchema, 'Admins');
