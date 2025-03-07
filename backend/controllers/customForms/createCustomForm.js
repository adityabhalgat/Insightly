const CustomForm = require('../../models/CustomForm');
const Company = require('../../models/company');

const createCustomForm = async (req, res) => {
  try {
    const { title, description, fields, isDefault } = req.body;
    const companyId = req.user.id; // Authenticated company
    const form = await CustomForm.create({ companyId, title, description, fields, isDefault });
    
    // Optionally update the Company document to track this custom form
    await Company.findByIdAndUpdate(companyId, { $push: { customForms: form._id } });
    
    res.status(201).json({ message: 'Custom form created successfully', form });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createCustomForm;
