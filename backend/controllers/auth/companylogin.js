const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Company = require('../../models/company');

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Company.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = login;

