const Product = require('../../models/product');

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get product ID from URL params
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ✅ Use deleteOne() or findByIdAndDelete() instead of remove()
    await Product.findByIdAndDelete(id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Product Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProduct;
