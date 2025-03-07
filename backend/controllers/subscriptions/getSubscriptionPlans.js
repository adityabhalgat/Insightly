const SubscriptionPlan = require('../../models/SubscriptionPlan');

const getSubscriptionPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getSubscriptionPlans;
