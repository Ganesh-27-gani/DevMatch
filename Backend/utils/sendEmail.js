import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  if (!to) throw new Error("Recipient email is missing");

  // Convert to string if it's an object
  if (typeof to !== "string") {
    if (to.email) {
      to = to.email;
    } else {
      throw new Error("Recipient email is invalid");
    }
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"digifywebandmedia" <${process.env.EMAIL_USER}>`,
    to: to.trim(),
    subject,
    text,
  });
};