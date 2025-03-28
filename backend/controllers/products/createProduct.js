const jwt = require('jsonwebtoken');
const Product = require('../../models/Product');

const createProduct = async (req, res) => {
  try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
          console.error("❌ Error: No token provided!");
          return res.status(401).json({ error: "Unauthorized. No token provided." });
      }

      const token = authHeader.split(" ")[1];

      // Decode the token (bypassing middleware)
      const secret = process.env.JWT_SECRET || "your_default_secret"; // Ensure the correct secret is used
      let decoded;

      try {
          decoded = jwt.decode(token, secret);
          console.log("✅ Decoded Token Data:", decoded);
      } catch (error) {
          console.error("❌ JWT Verification Failed:", error.message);
          return res.status(401).json({ error: "Invalid token." });
      }

      const { id } = decoded;

      if (!id) {
          console.error("❌ Error: companyId is missing in token!");
          return res.status(400).json({ error: "Company ID is required but not found." });
      }

      const { name, category, description } = req.body;

      const newProduct = new Product({
          name,
          category,
          description,
          company: id, // Automatically set company ID
      });

      await newProduct.save();
      res.status(201).json({ message: "Product created successfully", product: newProduct });

  } catch (error) {
      console.error("❌ Create Product Error:", error);
      res.status(500).json({ error: error.message });
  }
};

module.exports = createProduct;
