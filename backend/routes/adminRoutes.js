const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { authenticate, authorize } = require('../middleware/auth');

// Admin endpoints for review approval/rejection and user management.
router.put('/reviews/:id/approve', authenticate, authorize(['admin']), adminController.approveReview);
router.put('/reviews/:id/reject', authenticate, authorize(['admin']), adminController.rejectReview);
router.get('/reviews/pending', authenticate, authorize(['admin']), adminController.listPendingReviews);
router.get('/users', authenticate, authorize(['admin']), adminController.listAllUsers);

module.exports = router;
