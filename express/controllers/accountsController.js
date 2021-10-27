const Accounts = require('../models/accounts')

module.exports = {
  getAllAccounts: async (req, res) => {
    const allAccounts = await Accounts.getAllAccounts()
    res.status(200).json(allAccounts);
  },

  uploadTb: async (req, res) => {
    await Accounts.uploadTb(req.body)
    .then(() => {
      console.log('upload OK');
      res.status(200).json({message: 'success'});
    })
    .catch(err => {
      console.log('upload failed');
      console.log(err);
      res.status(400).json({message: 'error'});
    });

  }
};
