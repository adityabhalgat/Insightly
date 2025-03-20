const Product = require('../../models/product');
const jwt = require('jsonwebtoken');

const getProductsByCompany = async (req, res) => {
  try {

   const authHeader = req.headers.authorization;
         if (!authHeader || !authHeader.startsWith("Bearer ")) {
             console.error("❌ Error: No token provided!");
             return res.status(401).json({ error: "Unauthorized. No token provided." });
         }
   
         const token = authHeader.split(" ")[1];
   
         // Decode the token (bypassing middleware)
         const secret = process.env.JWT_SECRET; // Ensure the correct secret is used
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
   
    // Fetch products belonging to the company
    const products = await Product.find({ company: id });
    res.json(products);
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductsByCompany;
