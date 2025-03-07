const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payments');
const { authenticate } = require('../middleware/auth');

// Payment endpoints can be accessed by companies and users (depending on the role).
router.post('/initiate', authenticate, paymentController.initiatePayment);
router.put('/update', authenticate, paymentController.updatePaymentStatus);
router.get('/', authenticate, paymentController.listPayments);

module.exports = router;
