import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;
import fastifyPlugin from 'fastify-plugin';

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

export default fastifyPlugin(dbconnector);
