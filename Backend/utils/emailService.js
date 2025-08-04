import nodemailer from 'nodemailer';

export const sendBookingConfirmation = async (to, booking) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Booking Confirmed 🎉',
    html: `
      <h3>Your booking is confirmed!</h3>
      <p>Project: ${booking.projectType}</p>
      <p>Deadline: ${booking.deadline}</p>
    `,
  });
};
