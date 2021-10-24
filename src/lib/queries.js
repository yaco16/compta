import { db } from './database.js'; // import de la database

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
  const response = await db.query(`INSERT INTO accounts (email, password) VALUES ($1, $2) RETURNING *;`, [email, password]);
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
