const express = require('express');
const router = express.Router();
const  productController = require('../controllers/products');
const authMiddleware = require('../middleware/authmiddleware');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         AmazonLink:
 *           type: string
 *         FlipkartLink:
 *           type: string
 *         company:
 *           type: string
 *         avgRating:
 *           type: number
 *         reviewCount:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - description
 *       properties:
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         AmazonLink:
 *           type: string
 *         FlipkartLink:
 *           type: string
 */

// Payment endpoints can be accessed by companies and users (depending on the role).
router.post('/create', productController.createProduct);
router.put('/update', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/get/:id', productController.getProduct);
router.get('/getall', productController.getProducts);
router.get('/getbycompany', productController.getProductsByCompany);

module.exports = router;
