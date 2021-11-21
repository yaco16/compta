const bcrypt = require('bcrypt');
const pgp = require('pg-promise')({
  capSQL: true,
});
const db = require('../lib/database');

class Users {

  static async createUser(formData) {
    const { firstname, lastname, email, password } = formData;

    const hashedPassword = await this.hashPassword(password);
    try {
      const rows = await db.any(
        `
      INSERT INTO users
      (firstname, lastname, email, password)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT(email)
      DO NOTHING
      RETURNING *`,
        [firstname, lastname, email, hashedPassword]
      );
      return rows;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  }

  static hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
}

module.exports = Users;
