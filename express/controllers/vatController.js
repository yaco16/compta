const Vat = require( '../models/vatModel');

module.exports = {
  getUnpaidInvoices: async (req, res) => {
    try {
      const response = await Turnover.getAnnualTurnover();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'error' });
    }
  }}