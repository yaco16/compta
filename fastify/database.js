const dotenv = require('dotenv');
const { Client } = require('pg')
const fastifyPlugin = require('fastify-plugin');

dotenv.config();

const client = new Client(process.env.DB_URL);

async function dbconnector(fastify, options) {
  try {
    await client.connect();
    console.log('connected succesfully to database');
    fastify.decorate('db', { client });
  } catch (err) {
    console.error(err);
  }
}

module.exports = fastifyPlugin(dbconnector);
