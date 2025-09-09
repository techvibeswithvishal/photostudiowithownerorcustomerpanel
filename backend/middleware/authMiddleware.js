const jwt = require("jsonwebtoken");

// Middleware to verify Owner JWT
const verifyOwnerToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "No token, authorization denied" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.ownerId) return res.status(401).json({ message: "Not an owner token" });

    req.ownerId = decoded.ownerId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

// Middleware to verify School JWT
const verifySchoolToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "No token, authorization denied" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.schoolId) return res.status(401).json({ message: "Not a school token" });

    req.schoolId = decoded.schoolId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = { verifyOwnerToken, verifySchoolToken };
