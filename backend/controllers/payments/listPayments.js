const Payment = require('../../models/Payment');

const listPayments = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'company') {
      filter.payerId = req.user.id;
    } else if (req.user.role === 'user') {
      filter.receiverId = req.user.id;
    }
    const payments = await Payment.find(filter);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = listPayments;
