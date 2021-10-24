const Fastify = require('fastify');
const routes = require('./routes.js');
const dbconnector = require('./database.js');
const dotenv = require('dotenv');

dotenv.config();

const app = Fastify({
  logger: true
})

//CORS
app.register(require('fastify-cors'), {
  origin: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
});

app.register(dbconnector); //doit être placé avant register(routes)
app.register(routes, { prefix: 'api' });

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
