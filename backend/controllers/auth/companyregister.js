const bcrypt = require('bcryptjs');
const Company = require('../../models/company');

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { username, email, password: hashedPassword, role };
    const newUser = await Company.create(userData);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = register;
