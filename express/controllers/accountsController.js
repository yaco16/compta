const Accounts = require('../models/accounts')

module.exports = {
  getAllAccounts: async (req, res) => {
    const allAccounts = await Accounts.getAllAccounts()
    res.status(200).json(allAccounts);
  },

  importCsvInTb: async (req, res) => {
    await Accounts.importInTb(req.body)
    res.status(200).json({oki: 'doki'});

  }
};
