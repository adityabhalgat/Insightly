const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of users
 */

// Admin endpoints for review approval/rejection and user management.
router.put('/reviews/:id/approve', authenticate, authorize(['admin']), adminController.approveReview);
router.put('/reviews/:id/reject', authenticate, authorize(['admin']), adminController.rejectReview);
router.get('/reviews/pending', authenticate, authorize(['admin']), adminController.listPendingReviews);
router.get('/users', authenticate, authorize(['admin']), adminController.listAllUsers);

module.exports = router;
