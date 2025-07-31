const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Company = require('../../models/company');

const secret = process.env.JWT_SECRET;

if (!secret) {
    console.error("ERROR: JWT_SECRET is not set in .env file!");
}

/**
 * @desc Company login
 * @route POST /api/company/login
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await Company.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, companyId: user._id }, 
            secret, 
            { expiresIn: '1h' }
        );

        console.log("Login Successful! Token:", token);

        // Send response
        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.error(" Login Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = login;
