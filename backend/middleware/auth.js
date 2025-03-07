const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // decoded payload should include id and role (and any other needed fields)
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

exports.authorize = (roles = []) => {
  // Accept a string or array of roles
  if (typeof roles === 'string') roles = [roles];

  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: Insufficient rights" });
    }
    next();
  };
};
