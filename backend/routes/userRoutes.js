const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/profile', userController.getUserProfile);
router.put('/profile', authenticate, authorize(['user']), userController.updateUserProfile);
router.put('/change-password', authenticate, authorize(['user']), userController.changePassword);

module.exports = router;
