const Transaction = require('../../models/Transaction');

const createTransaction = async (req, res) => {
  try {
    const { amount, type, description } = req.body;
    const transaction = await Transaction.create({
      userId: req.user.id,
      amount,
      type,
      description,
    });
    res.status(201).json({ message: 'Transaction recorded', transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createTransaction;
