const Transaction = require('../../models/Transaction');

const getTransactions = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role !== 'admin') {
      filter.userId = req.user.id;
    }
    const transactions = await Transaction.find(filter);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTransactions;
