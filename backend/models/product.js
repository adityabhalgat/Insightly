const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String },
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    company : {type : mongoose.Schema.Types.ObjectId, ref : 'Company' , required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
