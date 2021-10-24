import Fastify from 'fastify';
import routes from './routes.js';
import dbconnector from './database.js';
import dotenv from 'dotenv';

dotenv.config();

const app = Fastify({
  logger: true
})

//CORS
app.register(import('fastify-cors'), {
  origin: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
});

app.register(dbconnector); //doit être placé avant register(routes)
app.register(routes, { prefix: 'v1' });

const start = async () => {
  try {
    await app.listen(2222);
    console.log('server is connected');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
