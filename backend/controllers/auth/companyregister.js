const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Company = require('../../models/company');

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * @desc Register a new company
 * @route POST /api/company/register
 */
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await Company.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new company user
        const newUser = await Company.create({
            name: username,
            email,
            password: hashedPassword
        });

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id, companyId: newUser._id }, secret, { expiresIn: '1h' });

        // Send response with token
        res.status(201).json({
            message: "Company registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = register;
