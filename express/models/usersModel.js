const pgp = require('pg-promise')({
  capSQL: true,
});
const db = require('../lib/database');

class Users {
    static async createUser(formData) {
      const {firstname, lastname, email, password} = formData;
    try {
      const rows = await db.any(`
      INSERT INTO users
      (firstname, lastname, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *`, [firstname, lastname, email, password]);
      return rows;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }
}

module.exports = Users;
