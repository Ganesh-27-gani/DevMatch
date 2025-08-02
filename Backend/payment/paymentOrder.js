import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payment/create-order
export const paymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ msg: 'Amount is required' });
    }

    const options = {
      amount: amount * 100, // Convert to paise (Rs. 500 → 50000)
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Failed to create payment order',
      error: err.message,
    });
  }
};
