const db = require('../lib/database');

class Accounts {
  static async getAllAccounts() {
    const {rows} = await db.query(`select * from accounts`);
    return rows;
  }
}

module.exports = Accounts;