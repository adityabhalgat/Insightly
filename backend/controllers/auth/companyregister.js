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

        const existingUser = await Company.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Company.create({
            name: username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: newUser._id, companyId: newUser._id }, secret, { expiresIn: '1h' });

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
