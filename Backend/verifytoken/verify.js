import jwt from 'jsonwebtoken';
import User from '../models/User.js';

import { JWT_SECRET } from "../config/jwt.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ msg: 'User not found' });

    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token', error: err.message });
  }
};
export const verifyAdmin = (req, res, next) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    next();
  } catch (err) {
    res.status(500).json({ msg: 'Authorization error', error: err.message });
  }
};

