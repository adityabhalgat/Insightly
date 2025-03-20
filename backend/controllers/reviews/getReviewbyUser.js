const Review = require("../../models/Review");
const jwt = require("jsonwebtoken");

const getUserReviews = async (req, res) => {
  try {
    // Extract token from headers
    const authHeader = req.header("Authorization");
    console.log("Authorization Header:", authHeader);
    
    const token = authHeader?.split(" ")[1];
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Decode JWT to get user ID
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded JWT:", decoded);
    } catch (jwtError) {
      console.log("JWT Verification Error:", jwtError);
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;
    console.log("Extracted User ID:", userId);

    // Fetch reviews written by the user
    const reviews = await Review.find({ userId: userId });
    console.log("Fetched Reviews:", reviews);

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getUserReviews;
