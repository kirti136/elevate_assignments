const jwt = require("jsonwebtoken");
const secret = "your-secret-key";

function authenticate(req, res) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return [null, "Authorization header missing"];

  const token = authHeader.split(" ")[1];
  if (!token) return [null, "Token missing"];

  try {
    const user = jwt.verify(token, secret);
    return [user, null];
  } catch (err) {
    return [null, "Invalid token"];
  }
}

module.exports = authenticate;
