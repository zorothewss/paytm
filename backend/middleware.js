const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  const authHeader = req.header.authorizarion;

  if (!authHeader || !authHeader.startswith("Bearer ")) {
    return res.status(403).json({});
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
        res.status(403), json({});
    }
  } catch {
    res.status(403).json({});
  }
};

module.exports = { authMiddleWare };
