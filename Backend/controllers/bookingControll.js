import Booking from '../models/Booking.js';
import mongoose from 'mongoose';
import crypto from 'crypto';
import razorpay from '../utils/razorpayClient.js';
import { sendBookingConfirmation } from '../utils/emailService.js';

 export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,  
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create Razorpay order', error: err.message });
  }
};

 export const verifyAndCreateBooking = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingData,
  } = req.body;

   
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ msg: 'Payment verification failed' });
  }

  try {
    const booking = new Booking({
      customer: req.user.id,
      projectType: bookingData.projectType,
      requirements: bookingData.requirements,
      deadline: bookingData.deadline,
      paymentId: razorpay_payment_id,
      status: 'Paid',
    });

    await booking.save();

    // 📧 Send confirmation email
    await sendBookingConfirmation(bookingData.email, booking);

    res.status(201).json({ msg: 'Payment verified, booking created', booking });
  } catch (err) {
    res.status(500).json({ msg: 'Booking creation failed', error: err.message });
  }
};

// ✅ Get My Bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id }).populate('assignedTo', 'name email');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching bookings', error: err.message });
  }
};

// ✅ Edit My Booking
export const editMyBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Unauthorized: Not your booking' });
    }

    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ msg: 'Booking updated', booking: updated });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating booking', error: err.message });
  }
};

// ✅ Delete My Booking
export const deleteMyBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Unauthorized: Not your booking' });
    }

    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ msg: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting booking', error: err.message });
  }
};
