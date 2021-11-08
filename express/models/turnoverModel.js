const db = require('../lib/database');

class Turnover {
  static async getAnnualTurnover(slug) {
    const beginningDate = slug.substring(1, 5) + '/07/01'; //2021 => 21
    const endDate = slug.substring(6, 10) + '/06/30';

    const rows = await db.any(`SELECT SUM(credit-debit) FROM accounts WHERE number LIKE '70%' AND date BETWEEN '${beginningDate}' and '${endDate}'`); //à réécrire avec les paramètres ci-dessus
    return rows;
  }

  static async getMonthlyTurnover(fiscal_year) {
    const year1 = fiscal_year.substring(0, 4); //2021-2022 => 2021
    const year2 = fiscal_year.substring(5, 9); //2021-2022 => 2022

    try {
      const response = await db.tx('get monthly turnover', async (t) => {
        const getTotal07 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between $1'/07/01' and $1'/07/31'`, [
          year1,
        ]);
        const getTotal08 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between $1'/08/01' and $1'/08/31'`, [
          year1,
        ]);
        const getTotal09 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between $1'/09/01' and $1'/09/30'`, [
          year1,
        ]);
        const getTotal10 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between $1'/10/01' and $1'/10/31'`, [
          year1,
        ]);
        const getTotal11 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between $1'/11/01' and $1'/11/30'`, [
          year1,
        ]);
        const getTotal12 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between $1'/12/01' and $1'/12/31'`, [
          year1,
        ]);
        const getTotal01 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between $1'/01/01' and $1'/01/31'`, [
          year2,
        ]);
        const getTotal02 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between $1'/02/01' and $1'/02/28'`, [
          year2,
        ]);
        const getTotal03 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between $1'/03/01' and $1'/03/31'`, [
          year2,
        ]);
        const getTotal04 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between $1'/04/01' and $1'/04/30'`, [
          year2,
        ]);
        const getTotal05 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between $1'/05/01' and $1'/05/31'`, [
          year2,
        ]);
        const getTotal06 = await t.any(`select sum(credit-debit) from accounts where number like '70%' and date between $1'/06/01' and $1'/06/30'`, [
          year2,
        ]);
        return {
          getTotal07,
          getTotal08,
          getTotal09,
          getTotal10,
          getTotal11,
          getTotal12,
          getTotal01,
          getTotal02,
          getTotal03,
          getTotal04,
          getTotal05,
          getTotal06,
        };
      });
      return response;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }

  static async getLastTurnovers() {
    try {
      const response = await db.tx('get last turnovers', async (t) => {
        const turnover1 = await db.any(
          `SELECT SUM(credit-debit) FROM accounts WHERE number LIKE '70%' AND date BETWEEN '2019/07/01' and '2020/06/30'`
        ); //à réécrire avec les paramètres ci-dessus
        const turnover2 = await db.any(
          `SELECT SUM(credit-debit) FROM accounts WHERE number LIKE '70%' AND date BETWEEN '2020/07/01' and '2021/06/30'`
        ); //à réécrire avec les paramètres ci-dessus
        const turnover3 = await db.any(
          `SELECT SUM(credit-debit) FROM accounts WHERE number LIKE '70%' AND date BETWEEN '2021/07/01' and '2022/06/30'`
        ); //à réécrire avec les paramètres ci-dessus
        return { turnover1, turnover2, turnover3 };
      });
      return response;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }

  static async getTurnoverByActivities(fiscal_year) {
    const year1 = fiscal_year.substring(0, 4); //2021-2022 => 2021
    const year2 = fiscal_year.substring(5, 9); //2021-2022 => 2022
    try {
      const response = await db.tx('get last turnovers', async (t) => {
        const get7061 = await t.any(`select sum(credit-debit) from accounts where number like '70610%' and date between $1'/06/01' and $2'/06/30'`, [
          year1,
          year2,
        ]);
        const get70611 = await t.any(`select sum(credit-debit) from accounts where number like '70611%' and date between $1'/06/01' and $2'/06/30'`, [
          year1,
          year2,
        ]);
        const get7062 = await t.any(`select sum(credit-debit) from accounts where number like '7062%' and date between $1'/06/01' and $2'/06/30'`, [
          year1,
          year2,
        ]);
        const get7063 = await t.any(`select sum(credit-debit) from accounts where number like '70630%' and date between $1'/06/01' and $2'/06/30'`, [
          year1,
          year2,
        ]);
        const get70631 = await t.any(`select sum(credit-debit) from accounts where number like '70631%' and date between $1'/06/01' and $2'/06/30'`, [
          year1,
          year2,
        ]);
        const get70641 = await t.any(`select sum(credit-debit) from accounts where number like '70641%' and date between $1'/06/01' and $2'/06/30'`, [
          year1,
          year2,
        ]);
        const get709 = await t.any(`select sum(credit-debit) from accounts where number like '709%' and date between $1'/06/01' and $2'/06/30'`, [
          year1,
          year2,
        ]);

        return { get7061, get70611, get7062, get7063, get70631, get70641, get709 };
      });
      return response;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }
}
module.exports = Turnover;
