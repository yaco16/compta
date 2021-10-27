const { Router } = require('express');
const router = Router();
const accountsController = require('./controllers/accountsController')

router.get('/get-all-accounts', accountsController.getAllAccounts);
router.post('/import-csv-in-tb', accountsController.importCsvInTb);

module.exports = router;
