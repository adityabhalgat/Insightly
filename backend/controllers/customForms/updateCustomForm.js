const CustomForm = require('../../models/CustomForm');

const updateCustomForm = async (req, res) => {
  try {
    const form = await CustomForm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!form) return res.status(404).json({ error: 'Form not found' });
    res.json({ message: 'Custom form updated', form });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateCustomForm;
