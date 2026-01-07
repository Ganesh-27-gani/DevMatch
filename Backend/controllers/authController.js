import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'devmatch_secret';

const otpStore = new Map();

 
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.set(email, otp);
    otpStore.set(`${email}_user`, {
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log(`📧 OTP for ${email}: ${otp}`);

    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Registration error" });
  }
};

 export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ msg: "Email and OTP required" });
    }

    const storedOtp = otpStore.get(email);
    if (!storedOtp) {
      return res.status(400).json({ msg: "OTP not found" });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    const userData = otpStore.get(`${email}_user`);
    if (!userData) {
      return res.status(400).json({ msg: "User data missing. Register again." });
    }

    const newUser = new User(userData);
    await newUser.save();

    otpStore.delete(email);
    otpStore.delete(`${email}_user`);

    res.status(201).json({ msg: "User registered successfully" });

  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

 
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Login error', error: err.message });
  }
};

 
export const forgotPassword = async (req, res) => {
  const { phone } = req.body;
  const user = await User.findOne({ phone });
  if (!user) return res.status(404).json({ msg: 'User not found with this phone number' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, otp);
  console.log(`📲 OTP for ${phone}: ${otp}`);

  res.json({ msg: 'OTP sent successfully' });
};


export const verifyOtpAndReset = async (req, res) => {
  const { phone, otp, newPassword } = req.body;

  const storedOtp = otpStore.get(phone);
  if (!storedOtp || storedOtp !== otp) return res.status(400).json({ msg: 'Invalid OTP' });

  const user = await User.findOne({ phone });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  otpStore.delete(phone);
  res.json({ msg: 'Password reset successful' });
};

export const sendProfileUpdateOtp = async (req, res) => {
  const { phone } = req.body;
  const phoneKey = phone.toString(); 
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phoneKey, otp);
  console.log(`🔁 OTP for update ${phone}: ${otp}`);
  res.json({ msg: 'OTP sent for update verification' });
};

 
 

 export const verifyOtpAndUpdateProfile = async (req, res) => {
  try {
    const { userId, name, email, phone, otp } = req.body;
    const phoneKey = phone.toString();
    const storedOtp = otpStore.get(phoneKey);

    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail && existingEmail._id.toString() !== userId) {
        return res.status(400).json({ msg: 'Email already in use' });
      }
    }

    if (phone && phone !== user.phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone && existingPhone._id.toString() !== userId) {
        return res.status(400).json({ msg: 'Phone already in use' });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    await user.save();

    otpStore.delete(phoneKey);
    res.json({ msg: 'Profile updated successfully', user });

  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
