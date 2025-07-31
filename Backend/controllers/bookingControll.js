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
