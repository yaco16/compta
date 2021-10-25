const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();


const client = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: 5432
});

(async () => {
  await client.connect();
})();

console.log(`Connected to database`);

module.exports = client;
