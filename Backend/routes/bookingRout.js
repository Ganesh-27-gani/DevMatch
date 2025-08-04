import express from 'express';
import { createRazorpayOrder, deleteMyBooking, editMyBooking, getMyBookings, verifyAndCreateBooking } from '../controllers/bookingControll.js';
import   {  verifyToken } from '../verifytoken/verify.js';
 
const router = express.Router();
 
 
router.post('/payment/order', verifyToken, createRazorpayOrder);
router.post('/verify', verifyToken, verifyAndCreateBooking);
router.get('/my-bookings', verifyToken, getMyBookings);
router.put('/my-bookings/:id', verifyToken, editMyBooking);
router.delete('/my-bookings/:id', verifyToken, deleteMyBooking);

export default router;
