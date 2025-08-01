import express from 'express';
import { createBooking, assignBooking, getMyBookings } from '../controllers/bookingControll.js';
import   {  verifyAdmin, verifyToken } from '../verifytoken/verify.js';
 
const router = express.Router();
 
router.post('/create', verifyToken, createBooking);
router.get('/my-bookings', verifyToken, getMyBookings);

 
router.put('/assign/:id', verifyToken, verifyAdmin, assignBooking);

export default router;
