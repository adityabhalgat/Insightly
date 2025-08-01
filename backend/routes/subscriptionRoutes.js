const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptions');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription management
 */

/**
 * @swagger
 * /subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionInput'
 *     responses:
 *       201:
 *         description: Subscription created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 subscription:
 *                   $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         plan:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *     SubscriptionInput:
 *       type: object
 *       required:
 *         - userId
 *         - plan
 *       properties:
 *         userId:
 *           type: string
 *         plan:
 *           type: string
 */

// Only admin can create subscription plans.
router.post('/plan', authenticate, authorize(['admin']), subscriptionController.createSubscriptionPlan);
router.get('/plans', authenticate, subscriptionController.getSubscriptionPlans);

// Only companies can subscribe to a plan and update their subscription.
router.post('/subscribe', authenticate, authorize(['company']), subscriptionController.subscribeCompany);
router.put('/update', authenticate, authorize(['company']), subscriptionController.updateCompanySubscription);
router.get('/', authenticate, authorize(['company']), subscriptionController.getCompanySubscription);

module.exports = router;
