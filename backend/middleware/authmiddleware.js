const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Data:", decoded); // ✅ Log decoded data
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        console.error("JWT Verification Failed:", error.message);
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
    }
};

module.exports = authMiddleware;
