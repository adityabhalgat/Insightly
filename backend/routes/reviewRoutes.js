const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const { authenticate, authorize } = require('../middleware/auth');

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
