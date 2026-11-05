
import jwt from "jsonwebtoken";

export function AuthMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token is required",
      });
    }

    const [scheme, AccessToken] = authHeader.split(" ");

    if (scheme !== "Bearer" || !AccessToken) {
      return res.status(401).json({
        message: "Invalid authorization format. Use Bearer token",
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET) {
      console.error("JWT_SECRET_KEY is missing");

      return res.status(500).json({
        message: "Server authentication configuration error",
      });
    }

    const decoded = jwt.verify(AccessToken, JWT_SECRET);

    if (decoded.type !== "access") {
      return res.status(401).json({
        message: "Invalid access token",
      });
    }

    req.user = {
      userId: decoded.userId,
      username: decoded.username,
    };

    return next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Access token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid access token",
      });
    }

    console.error("Authentication Error:", error);

    return res.status(500).json({
      message: "Authentication failed",
    });
  }
}
