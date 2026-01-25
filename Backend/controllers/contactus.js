import ContactModel from "../models/contactModel.js";
import nodemailer from "nodemailer";

export const contactUs = async (req, res) => {
  console.log("REQ.USER", req.user);

  const { name, email, phone, subject, message } = req.body;

  if (!req.user) {
    return res.status(401).json({ msg: "Login required" });
  }

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // 1️⃣ Save contact in DB
    await ContactModel.create({
      user: req.user._id,
      name,
      email,
      phone,
      subject,
      message,
    });

    // 2️⃣ Mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    // 3️⃣ EMAIL TO ADMIN
    await transporter.sendMail({
      from: `"DIGIFY Support" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${subject}`,
      text: `
New contact received

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
      `,
    });

    // 4️⃣ EMAIL TO USER ✅ (THIS WAS MISSING)
    await transporter.sendMail({
      from: `"DIGIFY Support" <${process.env.ADMIN_EMAIL}>`,
      to: email, // 👈 USER EMAIL
      subject: "We received your request",
      text: `
Hi ${name},

Thank you for contacting DIGIFY.
We have received your message and our team will contact you shortly.

Your message:
"${message}"

Regards,
DIGIFY Team
      `,
    });

    res.status(200).json({
      success: true,
      msg: "Message sent successfully",
    });
  } catch (err) {
    console.error("CONTACT ERROR ❌", err);
    res.status(500).json({ msg: "Failed to send message" });
  }
};



export const getMyContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(contacts);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch contacts" });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find()
      .populate("user", "name email role")  
      .sort({ createdAt: -1 });

    res.status(200).json(contacts);
  } catch (err) {
    console.error("ADMIN GET CONTACTS ERROR", err);
    res.status(500).json({ msg: "Failed to fetch contacts" });
  }
};

