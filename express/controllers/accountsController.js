const Accounts = require('../models/accounts');

module.exports = {
  getAccounts: async (req, res) => {
    const accounts = await Accounts.getAccounts(firstAccount, secondAccount, beginningDate, endDate);
    res.status(200).json(accounts);
  },

  uploadTrialBalance: async (req, res) => {
    try {
      const response = await Accounts.uploadTrialBalance(req.body);

      if (response === 'error') {
        console.log('upload failed')
        res.status(400).json({ message: 'error' });
      }
      if (response > 0) {
        console.log('upload OK');
        res.status(200).json({ message: 'success', data: response });
      }

    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'error' });
    }
  },

  uploadJournal: async (req, res) => {
    try {
      const response = await Accounts.uploadJournal(req.body);

      if (response === 'error') {
        console.log('upload failed')
        res.status(400).json({ message: 'error' });
      }
      if (response > 0) {
        console.log('upload OK');
        res.status(200).json({ message: 'success', data: response });
      }

    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'error' });
    }
  },
};
