// const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pgPromise = require('pg-promise');


// const client = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DB,
//   password: process.env.PG_PASSWORD,
//   port: 5432
// });

// (async () => {
//   await client.connect();
// })();
const pgp = pgPromise({ /* Initialization Options */ });
const db = pgp(process.env.DB_URL)
console.log('connected to database')


module.exports = db;
