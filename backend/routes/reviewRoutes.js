const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const { authenticate, authorize } = require('../middleware/auth');


/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Endpoints for managing product reviews
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         productId:
 *           type: string
 *         userId:
 *           type: string
 *         rating:
 *           type: number
 *         usageDuration:
 *           type: string
 *         pros:
 *           type: string
 *         cons:
 *           type: string
 *         recommend:
 *           type: boolean
 *         review:
 *           type: string
 *         productSequenceNumber:
 *           type: string
 *         suggestions:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, accepted, rejected, marked for review]
 *         mlStatus:
 *           type: string
 *           enum: [pending, accepted, rejected, mark_for_review]
 *         adminApprovalStatus:
 *           type: string
 *           enum: [pending, accepted, rejected]
 *         reviewPrice:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ReviewInput:
 *       type: object
 *       required:
 *         - productId
 *         - rating
 *         - usageDuration
 *         - pros
 *         - cons
 *         - recommend
 *         - review
 *         - productSequenceNumber
 *       properties:
 *         productId:
 *           type: string
 *         rating:
 *           type: number
 *         usageDuration:
 *           type: string
 *         pros:
 *           type: string
 *         cons:
 *           type: string
 *         recommend:
 *           type: boolean
 *         review:
 *           type: string
 *         productSequenceNumber:
 *           type: string
 *         suggestions:
 *           type: string
 *         reviewPrice:
 *           type: number
 */

/**
 * @swagger
 * /reviews/marked-for-review:
 *   get:
 *     summary: Get all reviews marked for review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reviews marked for review
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *   put:
 *     summary: Update a review by ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
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
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 */

/**
 * @swagger
 * /reviews/user/{id}:
 *   get:
 *     summary: Get all reviews by a user
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: User not found
 */


router.get('/marked-for-review', reviewController.getMarkedForReview);

// Only users can create, update, and delete their reviews.
router.post('/', reviewController.createReview);
router.get('/:id', reviewController.getReview);
router.get('/', reviewController.getReviews);

// Allow both users and admins to update reviews
router.put('/:id', authenticate, authorize(['user', 'admin']), reviewController.updateReview);

router.delete('/:id', authenticate, authorize(['user']), reviewController.deleteReview);
router.get('/user/:id', reviewController.getUserReviews);

module.exports = router;
