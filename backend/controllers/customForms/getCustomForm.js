const CustomForm = require('../../models/CustomForm');

const getCustomForm = async (req, res) => {
  try {
    const form = await CustomForm.findById(req.params.id);
    if (!form) return res.status(404).json({ error: 'Form not found' });
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCustomForm;
