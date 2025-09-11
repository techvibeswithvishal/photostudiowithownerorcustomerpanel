// middleware/verifySchoolToken.js
const jwt = require("jsonwebtoken");

const verifySchoolToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.schoolId = decoded.schoolId; // ✅ set schoolId here
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifySchoolToken;
