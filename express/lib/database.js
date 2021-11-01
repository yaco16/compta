// const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pgPromise = require('pg-promise');

const pgp = pgPromise({});
const db = pgp(process.env.DB_URL)
console.log('connected to database')


module.exports = db;
