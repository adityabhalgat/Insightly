const CompanySubscription = require('../../models/CompanySubscription');

const getCompanySubscription = async (req, res) => {
  try {
    const subscription = await CompanySubscription.findOne({ companyId: req.user.id, status: 'active' });
    if (!subscription) return res.status(404).json({ error: 'No active subscription found' });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCompanySubscription;
