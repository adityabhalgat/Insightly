const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');
const { authenticate, authorize } = require('../middleware/auth');

// Only users can create, update, and delete their reviews.
router.post('/', reviewController.createReview);
router.get('/:id', reviewController.getReview);
router.get('/', reviewController.getReviews);
router.put('/:id', authenticate, authorize(['user']), reviewController.updateReview);
router.delete('/:id', authenticate, authorize(['user']), reviewController.deleteReview);
router.get('/user/:id', reviewController.getUserReviews);
//router.get('/company', reviewController.getCompanyReviews);

module.exports = router;
