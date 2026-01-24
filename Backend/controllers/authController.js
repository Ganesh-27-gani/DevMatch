import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmail } from "../utils/sendEmail.js";
import { JWT_SECRET } from "../config/jwt.js";


//  const JWT_SECRET = process.env.JWT_SECRET || 'digify_secret';

const otpStore = new Map();

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // store OTP + user temporarily
    otpStore.set(email, otp);
    otpStore.set(`${email}_user`, {
      name,
      email,
      password: hashedPassword,
      role,
    });

    // send email here 
    await sendEmail(
      email,
      "Your OTP Verification Code",
      `Hello ${name},\n\nYour OTP is: ${otp}\nIt is valid for 5 minutes.\n\nThank you!`
    );

    console.log(`📧 OTP sent to ${email}: ${otp}`);

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
      return res.status(400).json({ msg: "OTP expired or not found" });
    }

    if (String(storedOtp) !== String(otp)) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    const userData = otpStore.get(`${email}_user`);

    if (!userData) {
      return res.status(400).json({
        msg: "User data missing. Please register again.",
      });
    }

    const newUser = new User(userData);
    await newUser.save();

    otpStore.delete(email);
    otpStore.delete(`${email}_user`);

    return res.status(201).json({
      msg: "OTP verified successfully, user registered",
    });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err.message);
    return res.status(500).json({ msg: err.message });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email required" });
    }

    // check if user started registration
    const userData = otpStore.get(`${email}_user`);
    if (!userData) {
      return res.status(400).json({
        msg: "Please register again",
      });
    }

    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // overwrite old OTP
    otpStore.set(email, newOtp);

    // Send email
    await sendEmail(
      email,
      "DevMatch OTP",
      `Your new OTP is ${newOtp}`
    );

    console.log("Resent OTP:", newOtp);

    res.json({ msg: "OTP resent successfully" });
  } catch (err) {
    console.error(err);
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
      { expiresIn: '90d' }
    );
    // console.log("LOGIN JWT_SECRET:", JWT_SECRET);


    res.status(200).json({
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }

    });
  } catch (err) {
    res.status(500).json({ msg: 'Login error', error: err.message });
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'User not found with this phone number' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);
  console.log(`📲 OTP for ${email}: ${otp}`);

  res.json({ msg: 'OTP sent successfully' });
};


export const verifyOtpAndReset = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const storedOtp = otpStore.get(email);
  if (!storedOtp || storedOtp !== otp) return res.status(400).json({ msg: 'Invalid OTP' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  otpStore.delete(email);
  res.json({ msg: 'Password reset successful' });
};

export const sendProfileUpdateOtp = async (req, res) => {
  const { email } = req.body;
  const phoneKey = email.toString();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phoneKey, otp);
  console.log(`🔁 OTP for update ${email}: ${otp}`);
  res.json({ msg: 'OTP sent for update verification' });
};




export const verifyOtpAndUpdateProfile = async (req, res) => {
  try {
    const { userId, name, email, otp } = req.body;
    const phoneKey = email.toString();
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

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    otpStore.delete(phoneKey);
    res.json({ msg: 'Profile updated successfully', user });

  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
