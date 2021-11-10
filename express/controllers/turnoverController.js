const Turnover = require('../models/turnoverModel');
const stackedTurnover = require('../services/parseDbResults')

module.exports = {
  getAnnualTurnover: async (req, res) => {
    try {
      const response = await Turnover.getAnnualTurnover(req.params.slug);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'error' });
    }
  },

  getMonthlyTurnover: async (req, res) => {
    const data = await Turnover.getMonthlyTurnover(req.body.fiscal_year);
    const total07 = data.getTotal07[0].sum;
    const total08 = data.getTotal08[0].sum;
    const total09 = data.getTotal09[0].sum;
    const total10 = data.getTotal10[0].sum;
    const total11 = data.getTotal11[0].sum;
    const total12 = data.getTotal12[0].sum;
    const total01 = data.getTotal01[0].sum;
    const total02 = data.getTotal02[0].sum;
    const total03 = data.getTotal03[0].sum;
    const total04 = data.getTotal04[0].sum;
    const total05 = data.getTotal05[0].sum;
    const total06 = data.getTotal06[0].sum;

    const result = [total07, total08, total09, total10, total11, total12, total01, total02, total03, total04, total05, total06];

    await res.status(200).json(result);
  },

  compareFiscalYears: async (req, res) => {
    const result = await Turnover.getLastTurnovers();
    await res.status(200).json(result);
  },

  getTurnoverByDestinations: async (req, res) => {
    const result = await Turnover.getTurnoverByDestinations(req.body.fiscal_year);
    await res.status(200).json(result);
  },

  getStackedTurnover: async (req, res) => {
    const fetchMonthlyTurnover = await Turnover.getMonthlyTurnover(req.body.fiscal_year);
    const fetchTurnoverCutoff = await Turnover.getTurnoverCutoff(req.body.fiscal_year);
    const fetchTurnoverSurcoms = await Turnover.getTurnoverSurcoms(req.body.fiscal_year);

    const result = stackedTurnover(fetchMonthlyTurnover, fetchTurnoverCutoff, fetchTurnoverSurcoms);
    await res.status(200).json(result);
  },
};
