const CompanySubscription = require('../../models/CompanySubscription');
const SubscriptionPlan = require('../../models/SubscriptionPlan');

const subscribeCompany = async (req, res) => {
  try {
    const companyId = req.user.id;
    const { subscriptionPlanId } = req.body;
    const plan = await SubscriptionPlan.findById(subscriptionPlanId);
    if (!plan) return res.status(404).json({ error: 'Subscription plan not found' });
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.durationInDays);
    const subscription = await CompanySubscription.create({
      companyId,
      subscriptionPlanId,
      startDate,
      endDate,
      status: 'active'
    });
    res.status(201).json({ message: 'Company subscribed successfully', subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = subscribeCompany;
