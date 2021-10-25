const Accounts = require('../models/accounts')

module.exports = {
  getAllAccounts: async (req, res) => {
    const allAccounts = await Accounts.getAllAccounts()
    console.log('allAccounts:', allAccounts);
    res.status(200).json({ message: 'okidoki' });
  },
};
