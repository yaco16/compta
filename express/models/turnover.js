const db = require('../lib/database');

class Turnover {
  static async getMonthlyTurnover(year) {
    const{year1, year2} = year;
    try {
      const response = await db.tx('get monthly turnover', async (t) => {
        const getTotal07 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between '20${year1}/07/01' and '20${year1}/07/31'`);
        const getTotal08 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between '20${year1}/08/01' and '20${year1}/08/31'`);
        const getTotal09 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between '20${year1}/09/01' and '20${year1}/09/30'`);
        const getTotal10 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between '20${year1}/10/01' and '20${year1}/10/31'`);
        const getTotal11 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between '20${year1}/11/01' and '20${year1}/11/30'`);
        const getTotal12 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between '20${year1}/12/01' and '20${year1}/12/31'`);
        const getTotal01 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between '20${year2}/01/01' and '20${year2}/01/31'`);
        const getTotal02 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between '20${year2}/02/01' and '20${year2}/02/28'`);
        const getTotal03 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between '20${year2}/03/01' and '20${year2}/03/31'`);
        const getTotal04 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between '20${year2}/04/01' and '20${year2}/04/30'`);
        const getTotal05 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between '20${year2}/05/01' and '20${year2}/05/31'`);
        const getTotal06 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between '20${year2}/06/01' and '20${year2}/06/30'`);
        return {getTotal07, getTotal08, getTotal09, getTotal10, getTotal11, getTotal12, getTotal01, getTotal02, getTotal03, getTotal04, getTotal05, getTotal06};
      })
        return response;
     } catch (error) {
      console.error(error);
      return 'error';
    }
  }
}
module.exports = Turnover;