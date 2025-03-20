const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const getUserProfile = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Verify and decode token
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    const userId = decoded.id; // Extract user ID from token

    // Fetch user from database
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUserProfile;
