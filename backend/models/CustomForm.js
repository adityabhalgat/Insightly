const mongoose = require('mongoose');

const CustomFormSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    // Array of form field definitions
    fields: [
      {
        label: { type: String, required: true },
        type: { 
          type: String, 
          enum: ['text', 'textarea', 'number', 'email', 'date', 'select', 'radio', 'checkbox'], 
          default: 'text'
        },
        options: [String], // For select, radio, or checkbox fields
        required: { type: Boolean, default: false }
      }
    ],
    // If true, indicates this is the general/default form
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CustomForm', CustomFormSchema);
