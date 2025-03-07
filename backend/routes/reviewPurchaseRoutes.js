const express = require('express');
const router = express.Router();
const reviewPurchaseController = require('../controllers/reviewPurchases');
const { authenticate, authorize } = require('../middleware/auth');

// Only companies can initiate and verify review purchases.
router.post('/', authenticate, authorize(['company']), reviewPurchaseController.createReviewPurchase);
router.put('/verify', authenticate, authorize(['company']), reviewPurchaseController.verifyReviewPurchase);
router.get('/', authenticate, authorize(['company']), reviewPurchaseController.listReviewPurchases);

module.exports = router;
