const Turnover = require('../models/turnover');

module.exports = {
  postMonthlyTurnover: async (req, res) => {
    const year1 = req.body.year1;
    const year2 = req.body.year2;

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
      labels: [
        `07/${year1}`,
        `08/${year1}`,
        `09/${year1}`,
        `10/${year1}`,
        `11/${year1}`,
        `12/${year1}`,
        `01/${year2}`,
        `02/${year2}`,
        `03/${year2}`,
        `04/${year2}`,
        `05/${year2}`,
        `06/${year2}`,
      ],
      datasets: [
        {
          label: "Chiffre d'affaires en €",
          data: [total07, total08, total09, total10, total11, total12, total01, total02, total03, total04, total05, total06],
          backgroundColor: ['#ffbb11'],
        },
      ],
    };

    await res.status(200).json(chartData);
  },
};
