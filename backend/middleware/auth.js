require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ success: false, error: err.message });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = userAuth;
