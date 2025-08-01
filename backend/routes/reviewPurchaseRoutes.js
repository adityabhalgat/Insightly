const express = require('express');
const router = express.Router();
const reviewPurchaseController = require('../controllers/reviewPurchases');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: ReviewPurchases
 *   description: Review purchase management
 */

/**
 * @swagger
 * /review-purchases:
 *   get:
 *     summary: Get all review purchases
 *     tags: [ReviewPurchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of review purchases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReviewPurchase'
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a review purchase
 *     tags: [ReviewPurchases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewPurchaseInput'
 *     responses:
 *       201:
 *         description: Review purchase created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reviewPurchase:
 *                   $ref: '#/components/schemas/ReviewPurchase'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *
 * /review-purchases/{id}:
 *   get:
 *     summary: Get a review purchase by ID
 *     tags: [ReviewPurchases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review purchase details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewPurchase'
 *       404:
 *         description: Review purchase not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewPurchase:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         reviewId:
 *           type: string
 *         amount:
 *           type: number
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     ReviewPurchaseInput:
 *       type: object
 *       required:
 *         - userId
 *         - reviewId
 *         - amount
 *       properties:
 *         userId:
 *           type: string
 *         reviewId:
 *           type: string
 *         amount:
 *           type: number
 */

// Only companies can initiate and verify review purchases.
router.post('/', authenticate, authorize(['company']), reviewPurchaseController.createReviewPurchase);
router.put('/verify', authenticate, authorize(['company']), reviewPurchaseController.verifyReviewPurchase);
router.get('/', authenticate, authorize(['company']), reviewPurchaseController.listReviewPurchases);

module.exports = router;
