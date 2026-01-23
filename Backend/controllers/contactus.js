 import ContactModel from "../models/contactModel.js";
 import nodemailer from "nodemailer";
 
export const contactUs = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "Required fields missing" });
  }

  try {
    // Save (optional)
    await ContactModel.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
      `,
    });

    res.status(200).json({ msg: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to send message" });
  }
};



export const getMyContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(contacts);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch contacts" });
  }
};
