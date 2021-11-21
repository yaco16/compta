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

  static async checkLogin(formData) {
    const { email, password } = formData;
    const emailExists = await this.findEmail(email);

    if (emailExists.length !== 0) {
      console.log('email exists')
      const passwordIsConfirmed = await this.compareEmails(password, emailExists[0].password);
      if (passwordIsConfirmed) {
        return {errorCode: 0, user: emailExists[0]};
      } else {
        return {errorCode: 2};
      }
    } else {
      console.log('email does not exist')
      return {errorCode: 1};
    }
  }

  static findEmail = async (email) => {
    try {
      const rows = await db.any(
        `
        SELECT * FROM users
        WHERE email = $1
        `,
        [email.toLowerCase()]
      );
      return rows;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  };

  static compareEmails = async (passwordForm, passwordStored) => {
    const result = await bcrypt.compare(passwordForm, passwordStored);
    return result;
  };
}

module.exports = Users;
