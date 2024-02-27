const JWT = require("jsonwebtoken");
const User = require("../models/user");

const tokenDecode = (req) => {
  const bearerHeader = req.headers["authentication"];
  if (bearerHeader) {
    try {
      const bearer = bearerHeader.split(" ")[1];
      try {
        const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
        return decodedToken;
      } catch {
        return false;
      }
    } catch {
      return false;
    }
  }
};

exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json("権限がありません");
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};
