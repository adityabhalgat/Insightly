const Payment = require('../../models/Payment');

const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId, status } = req.body;
    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    payment.status = status;
    await payment.save();
    res.json({ message: 'Payment status updated', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updatePaymentStatus;
