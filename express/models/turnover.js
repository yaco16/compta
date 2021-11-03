const db = require('../lib/database');

class Turnover {
  static async getMonthlyTurnover() {
    try {
      const response = await db.tx('get monthly turnover', async (t) => {
        const getDebit07 = await t.any("select sum(debit) as total from accounts where number like '70%' and date like '%07/2021'");
        const getCredit07 = await t.any("select sum(credit) as total from accounts where number like '70%' and date like '%07/2021'");
        const getDebit08 = await t.any("select sum(debit) as total from accounts where number like '70%' and date like '%08/2021'");
        const getCredit08 = await t.any("select sum(credit) as total from accounts where number like '70%' and date like '%08/2021'");
        const getDebit09 = await t.any("select sum(debit) as total from accounts where number like '70%' and date like '%09/2021'");
        const getCredit09 = await t.any("select sum(credit) as total from accounts where number like '70%' and date like '%09/2021'");
        return { getDebit07, getCredit07, getDebit08, getCredit08, getDebit09, getCredit09 };
      })
        return response;
     } catch (error) {
      console.error(error);
      return 'error';
    }
  }
}
module.exports = Turnover;