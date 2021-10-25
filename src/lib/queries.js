import { db } from './database.js'; // import de la database
import format from 'pg-format';

//Dans ce fichier, on va regrouper toutes les requêtes faites à la base de données
//Ces requêtes seront ensuite importées individuellement dans chaque route du répertoire API
export async function getAllAccounts() {
  const response = await db.query(`SELECT * FROM accounts;`);
  return response;
}

export async function getAllUsers() {
  const response = await db.query(`SELECT * FROM users;`);
  return response;
}

export async function createUser(user) {
  const { email, password } = user;
  const response = await db.query(`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;`, [email, password]);
  return response;
}

//détail des comptes de CA
export async function getaccounts7() {
  const response = await db.query(`SELECT * FROM accounts WHERE number BETWEEN 70600000 AND 70964100;`);
  return response;
}

//Total CA
export async function getTotal70(account1, account2) {
  const response = await db.query(`SELECT SUM(value) FROM accounts WHERE number BETWEEN $1 AND $2;`, [account1, account2]);
  return response;
}

//import de la BG en DB
export async function importBG(data) {
// console.log('data:', data);

  let dataToSend = [[data]];
  let query1 = format('INSERT INTO accounts (number, label, total) VALUES %L returning *', dataToSend);
  console.log('query1:', query1);
  let { rows } = await db.query(query1);
  return rows;
}
