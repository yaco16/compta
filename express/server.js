const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
const port = 2222
const router = require('./router');

app
.use(cookieParser())

.use(express.json({limit: '25mb'}))
.use(bodyParser.urlencoded({
  extended: true
}))

.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

.use('/api', router)

.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
