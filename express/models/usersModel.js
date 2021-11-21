const bcrypt = require('bcrypt');
const pgp = require('pg-promise')({
  capSQL: true,
});
const db = require('../lib/database');

class Users {
  static async createUser(formData) {
    const { firstname, lastname, email, password } = formData;
    console.log('password:', typeof password);

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
    console.log('emailExists:', emailExists);

    if (emailExists) {
      const passwordIsConfirmed = await this.compareEmails(password, emailExists[0].password);
      if (passwordIsConfirmed) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }

  }

  static findEmail = async(email) => {
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
  }

  static compareEmails = async (passwordForm, passwordStored) => {
    console.log('passwordStored:', passwordStored);
    const result = await bcrypt.compare(passwordForm, passwordStored);
    console.log('result:', result);
    return result;
  }
}

module.exports = Users;
