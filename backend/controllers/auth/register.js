const bcrypt = require('bcryptjs');
const User = require('../../models/user');

const register = async (req, res) => {
  try {
    const { username, email, password, role = "user" } = req.body; // Default role
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { username : username, email, password: hashedPassword , role};
    const newUser = await User.create(userData);
    
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = register;
