export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

export const sendOtpEmail = async (email, otp) => {
   console.log(`Sending OTP ${otp} to ${email}`);
  return true;
};