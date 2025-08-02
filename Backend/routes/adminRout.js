import express from 'express';
import { verifyAdmin, verifyToken } from '../verifytoken/verify.js';
import { assignBooking, getAllBookings, getAllDevelopers } from '../controllers/adminControllar.js';
 
 

const router = express.Router();

 router.get('/allbookings', verifyToken, verifyAdmin, getAllBookings);

 router.get('/developers', verifyToken, verifyAdmin, getAllDevelopers);

 router.put('/assign/:id', verifyToken, verifyAdmin, assignBooking);

export default router;
