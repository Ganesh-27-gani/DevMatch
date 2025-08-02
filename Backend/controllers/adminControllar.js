import Booking from '../models/Booking.js';
import User from '../models/User.js';

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customer', 'name email role')        // Populate customer info
      .populate('assignedTo', 'name email role')      // Populate developer info
      .sort({ createdAt: -1 });                        // Optional: sort by latest first

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({
      msg: 'Failed to fetch bookings',
      error: err.message
    });
  }
};


export const getAllDevelopers = async (req, res) => {
  try {
    const developers = await User.find({ role: 'developer', isAvailable: true }).select('-password');
    res.status(200).json(developers);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch developers', error: err.message });
  }
};

export const assignBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { developerId, deadline } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    booking.assignedTo = developerId;
    booking.status = 'assigned';
    booking.deadline = deadline;

    await booking.save();

    res.status(200).json({ msg: 'Booking assigned', booking });
  } catch (err) {
    res.status(500).json({ msg: 'Assignment failed', error: err.message });
  }
};
