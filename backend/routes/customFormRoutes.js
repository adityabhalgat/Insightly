const express = require('express');
const router = express.Router();
const customFormController = require('../controllers/customForms');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: CustomForms
 *   description: Custom form management
 */

/**
 * @swagger
 * /custom-forms:
 *   get:
 *     summary: Get all custom forms
 *     tags: [CustomForms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of custom forms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomForm'
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a custom form
 *     tags: [CustomForms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomFormInput'
 *     responses:
 *       201:
 *         description: Custom form created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 customForm:
 *                   $ref: '#/components/schemas/CustomForm'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomForm:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         fields:
 *           type: array
 *           items:
 *             type: object
 *         createdAt:
 *           type: string
 *           format: date-time
 *     CustomFormInput:
 *       type: object
 *       required:
 *         - title
 *         - fields
 *       properties:
 *         title:
 *           type: string
 *         fields:
 *           type: array
 *           items:
 *             type: object
 */

// Only companies can manage custom forms.
router.post('/', authenticate, authorize(['company']), customFormController.createCustomForm);
router.get('/:id', authenticate, authorize(['company']), customFormController.getCustomForm);
router.put('/:id', authenticate, authorize(['company']), customFormController.updateCustomForm);
router.delete('/:id', authenticate, authorize(['company']), customFormController.deleteCustomForm);
router.get('/', authenticate, authorize(['company']), customFormController.listCustomForms);

module.exports = router;
