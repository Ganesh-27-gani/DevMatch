import Booking from '../models/Booking.js';
 import mongoose from 'mongoose';


export const createBooking = async (req, res) => {
  try {
    const { projectType, requirements, deadline } = req.body;

    const booking = new Booking({
      customer: req.user.id,
      projectType,
      requirements,
      deadline
    });

    await booking.save();
    res.status(201).json({ msg: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};



export const getMyBookings = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);  
    const bookings = await Booking.find({ customer: userId }).populate('assignedTo', 'name email');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching bookings', error: err.message });
  }
};

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
