const Turnover = require( '../models/turnover');

module.exports = {
  getMonthlyTurnover: async (req, res) => {
    console.log('dans le controller')

    const response = await Turnover.getMonthlyTurnover();
    const total07 = response.getTotal07[0].sum;
    const total08 = response.getTotal08[0].sum;
    const total09 = response.getTotal09[0].sum;
    const total10 = response.getTotal10[0].sum;
    const total11 = response.getTotal11[0].sum;
    const total12 = response.getTotal12[0].sum;
    const total01 = response.getTotal01[0].sum;
    const total02 = response.getTotal02[0].sum;
    const total03 = response.getTotal03[0].sum;
    const total04 = response.getTotal04[0].sum;
    const total05 = response.getTotal05[0].sum;
    const total06 = response.getTotal06[0].sum;

    const chartData = {
      labels: [`07/21`, `08/21`, `09/21`, `10/21`, `11/21`, `12/21`, `01/22`, `02/22`, `03/22`, `04/22`, `05/22`, `06/22`],
      datasets: [
        {
          label: "Chiffre d'affaires en €",
          data: [total07, total08, total09, total10, total11, total12, total01, total02, total03, total04, total05, total06],
          backgroundColor: ['#ffbb11'],
        },
      ],
    };

    await res.status(200).json(chartData);
  }}