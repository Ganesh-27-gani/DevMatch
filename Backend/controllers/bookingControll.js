import Booking from '../models/Booking.js';
import User from '../models/User.js';


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
    const bookings = await Booking.find({ customer: req.user._id });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching bookings', error: err.message });
  }
};
export const assignBooking = async (req, res) => {
  try {
    const { id } = req.params; // booking ID
    const { developerId, deadline } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    const developer = await User.findById(developerId);
    if (!developer || developer.role !== 'developer') {
      return res.status(400).json({ msg: 'Invalid developer ID' });
    }

    booking.assignedTo = developerId;
    booking.status = 'assigned';
    booking.deadline = deadline;

    await booking.save();

    res.status(200).json({ msg: 'Booking assigned to developer', booking });
  } catch (err) {
    res.status(500).json({ msg: 'Assignment failed', error: err.message });
  }
};
