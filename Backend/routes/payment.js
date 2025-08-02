import express from 'express'
import { paymentOrder } from '../payment/paymentOrder.js';
 
const router = express.Router();

router.post('/payment',paymentOrder)

export default router