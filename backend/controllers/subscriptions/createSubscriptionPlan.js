const SubscriptionPlan = require('../../models/SubscriptionPlan');

const createSubscriptionPlan = async (req, res) => {
  try {
    const { name, price, durationInDays, premiumFeatures } = req.body;
    const plan = await SubscriptionPlan.create({ name, price, durationInDays, premiumFeatures });
    res.status(201).json({ message: 'Subscription plan created', plan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createSubscriptionPlan;
