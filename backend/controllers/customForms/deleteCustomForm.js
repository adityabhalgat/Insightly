const CustomForm = require('../../models/CustomForm');

const deleteCustomForm = async (req, res) => {
  try {
    const form = await CustomForm.findById(req.params.id);
    if (!form) return res.status(404).json({ error: 'Form not found' });
    await form.remove();
    res.json({ message: 'Custom form deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteCustomForm;
