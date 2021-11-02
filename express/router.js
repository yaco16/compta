const { Router } = require('express');
const router = Router();
const accountsController = require('./controllers/accountsController')

router.get('/get-all-accounts', accountsController.getAllAccounts);
router.post('/upload-trial-balance', accountsController.uploadTrialBalance);
router.post('/upload-sales-journal', accountsController.uploadSalesJournal);

module.exports = router;
