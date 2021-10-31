const Accounts = require('../models/accounts');

module.exports = {
  getAllAccounts: async (req, res) => {
    const allAccounts = await Accounts.getAllAccounts();
    res.status(200).json(allAccounts);
  },

  uploadTb: async (req, res) => {
    try {
      const response = await Accounts.uploadTb(req.body);

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
