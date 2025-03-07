const Payment = require('../../models/Payment');

const initiatePayment = async (req, res) => {
  try {
    const { payerId, receiverId, amount } = req.body;
    const payment = await Payment.create({
      payerId,
      receiverId,
      amount,
      transactionType: 'review_purchase',
      status: 'pending'
    });
    res.status(201).json({ message: 'Payment initiated', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = initiatePayment;
