import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

//const JWT_SECRET = process.env.JWT_SECRET || 'digify_secret';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET); // ✅ FIXED

    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default authMiddleware;
