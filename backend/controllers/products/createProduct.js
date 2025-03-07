const Product = require('../../models/product');

const createProduct = async (req, res) => {
  try {
    const { name, category, brand, description } = req.body;
    const product = await Product.create({ name, category, brand, description });
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createProduct;
