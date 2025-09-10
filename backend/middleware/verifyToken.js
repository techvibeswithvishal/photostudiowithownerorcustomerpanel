const jwt = require("jsonwebtoken");

function verifySchoolToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Expect: "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.school = verified; // attach decoded payload (e.g., schoolId) to request
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
}

module.exports = { verifySchoolToken };
