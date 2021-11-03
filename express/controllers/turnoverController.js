const Turnover = require( '../models/turnover');

module.exports = {
  getMonthlyTurnover: async (req, res) => {

    const response = await Turnover.getMonthlyTurnover();
    const total07 = response.getCredit07[0].total - response.getDebit07[0].total;
    const total08 = response.getCredit08[0].total - response.getDebit08[0].total;
    const total09 = response.getCredit09[0].total - response.getDebit09[0].total;

    const chartData = {
      labels: ['07/21', '08/21', '09/21'],
      datasets: [
        {
          label: "Chiffre d'affaires en €",
          data: [total07, total08, total09],
          backgroundColor: ['#ffbb11'],
        },
      ],
    };

    await res.status(200).json(chartData);
  }}