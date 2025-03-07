const express = require('express');
const router = express.Router();
const customFormController = require('../controllers/customForms');
const { authenticate, authorize } = require('../middleware/auth');

// Only companies can manage custom forms.
router.post('/', authenticate, authorize(['company']), customFormController.createCustomForm);
router.get('/:id', authenticate, authorize(['company']), customFormController.getCustomForm);
router.put('/:id', authenticate, authorize(['company']), customFormController.updateCustomForm);
router.delete('/:id', authenticate, authorize(['company']), customFormController.deleteCustomForm);
router.get('/', authenticate, authorize(['company']), customFormController.listCustomForms);

module.exports = router;
