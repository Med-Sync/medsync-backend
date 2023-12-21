const jwt = require("jsonwebtoken");
const {
  badRequestResponse,
  accessDeniedResponse,
} = require("../utils/response");

exports.authMiddleware = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    token = token.split(" ")[1];
    if (!token) {
      return accessDeniedResponse(res, "Access Denied");
    }
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return badRequestResponse(res, "Something went wrong");
  }
};
