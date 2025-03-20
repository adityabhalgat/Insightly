const express = require('express');
const router = express.Router();
const  productController = require('../controllers/products');
const authMiddleware = require('../middleware/authmiddleware');

// Payment endpoints can be accessed by companies and users (depending on the role).
router.post('/create', productController.createProduct);
router.put('/update', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/get/:id', productController.getProduct);
router.get('/getall', productController.getProducts);
router.get('/getbycompany', productController.getProductsByCompany);

module.exports = router;
