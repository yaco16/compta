const { Router } = require('express');
const router = Router();
const accountsController = require('./controllers/accountsController')

router.get('/getAllAccounts', accountsController.getAllAccounts);

module.exports = router;
