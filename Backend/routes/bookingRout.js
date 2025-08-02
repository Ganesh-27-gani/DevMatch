import express from 'express';
import { createBooking, deleteMyBooking, editMyBooking, getMyBookings } from '../controllers/bookingControll.js';
import   {  verifyAdmin, verifyToken } from '../verifytoken/verify.js';
 
const router = express.Router();
 
router.post('/create', verifyToken, createBooking);
router.get('/my-bookings', verifyToken, getMyBookings);
router.put('/my-bookings/:id', verifyToken, editMyBooking);
router.delete('/my-bookings/:id', verifyToken, deleteMyBooking);

export default router;
