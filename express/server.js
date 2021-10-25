const express = require('express');
const cors = require('cors');

const app = express();
const port = 2222
const router = require('./router');

app
.use(cors({
  origin: '*',
}))

// .use(express.json())
// .use(express.urlencoded())

.use('/api', router)

.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
