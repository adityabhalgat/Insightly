const Product = require('../../models/Product');

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndDelete(id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProduct;
