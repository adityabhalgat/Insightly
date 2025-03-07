const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptions');
const { authenticate, authorize } = require('../middleware/auth');

// Only admin can create subscription plans.
router.post('/plan', authenticate, authorize(['admin']), subscriptionController.createSubscriptionPlan);
router.get('/plans', authenticate, subscriptionController.getSubscriptionPlans);

// Only companies can subscribe to a plan and update their subscription.
router.post('/subscribe', authenticate, authorize(['company']), subscriptionController.subscribeCompany);
router.put('/update', authenticate, authorize(['company']), subscriptionController.updateCompanySubscription);
router.get('/', authenticate, authorize(['company']), subscriptionController.getCompanySubscription);

module.exports = router;
