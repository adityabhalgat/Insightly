const CustomForm = require('../../models/CustomForm');

const listCustomForms = async (req, res) => {
  try {
    const forms = await CustomForm.find({ companyId: req.user.id });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = listCustomForms;
