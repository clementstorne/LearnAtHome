import jwt from "jsonwebtoken";

const extractBearer = (authorization) => {
  if (typeof authorization !== "string") {
    return false;
  }
  const matches = authorization.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

const verifyTokenMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && extractBearer(req.headers.authorization);
  if (!token) {
    return res
      .status(401)
      .json({
        message:
          "Access Denied. The requested resource requires authentication. Please provide valid credentials to access this resource.",
      });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(400).json({
        message:
          "The provided token is invalid or expired. Please ensure you have a valid token and try again.",
      });
    }
    req.auth = decodedToken;
    next();
  });
};

export default verifyTokenMiddleware;
