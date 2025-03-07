const CompanySubscription = require('../../models/CompanySubscription');

const updateCompanySubscription = async (req, res) => {
  try {
    const { subscriptionId, status } = req.body; // status: 'active', 'expired', 'cancelled'
    const subscription = await CompanySubscription.findById(subscriptionId);
    if (!subscription) return res.status(404).json({ error: 'Subscription not found' });
    subscription.status = status;
    await subscription.save();
    res.json({ message: 'Subscription updated', subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateCompanySubscription;
