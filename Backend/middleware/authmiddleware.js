import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config/jwt.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user; // ✅ FULL USER OBJECT
    // console.log("VERIFY JWT_SECRET:", JWT_SECRET);

    next();
  } catch (error) {
    console.log("JWT ERROR", error.message);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default authMiddleware;
