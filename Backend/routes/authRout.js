import express from 'express';
import { register, login, verifyOtp, forgotPassword, verifyOtpAndReset, sendProfileUpdateOtp, verifyOtpAndUpdateProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/forgot', forgotPassword)
router.post('/forgot-password/verify-otp', verifyOtpAndReset);
router.post('/profile/update-otp', sendProfileUpdateOtp);
router.put('/profile/update', verifyOtpAndUpdateProfile);



export default router;
