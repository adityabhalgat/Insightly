const product = require('../../models/product');

const updateproduct = async (req, res) => {
  try {
    const product = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'product not found' });
    res.json({ message: 'product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateproduct;
