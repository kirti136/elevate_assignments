const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    decoded.username = user.username;
    decoded.email = user.email;
    decoded.role = user.role;

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

const authorization = (data) => {
  return (req, res, next) => {
    try {
      if (!req.user || (!data && data.user.role != req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }
      next();
    } catch (error) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
  };
};

module.exports = { authentication, authorization };
