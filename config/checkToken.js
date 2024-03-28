import jwt from "jsonwebtoken";

export default function (req, res, next) {
  let token = req.get("Authorization") || req.query.token;
  if (token) {
    token = token.replace("Bearer ", "");
    // Check if token is valid and not expired
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      req.user = err ? null : decoded.user;
      req.exp = err ? null : new Date(decoded.exp * 1000);
      return next();
    });
  } else {
    req.user = null;
    return next();
  }
}
