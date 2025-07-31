import express from 'express';
import { createBooking, assignBooking } from '../controllers/bookingControll.js';
import   { isAdmin, verifyToken } from '../verifytoken/verify.js';
 
const router = express.Router();
 
router.post('/create', verifyToken, createBooking);

 
router.put('/assign/:id', verifyToken, isAdmin, assignBooking);

export default router;
