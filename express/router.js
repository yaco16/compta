const { Router } = require('express');
const router = Router();
const accountsController = require('./controllers/accountsController')
const turnoverController = require('./controllers/turnoverController')

router.get('/get-all-accounts', accountsController.getAllAccounts);
router.get('/get-monthly-turnover', turnoverController.getMonthlyTurnover);
router.post('/upload-trial-balance', accountsController.uploadTrialBalance);
router.post('/upload-journal', accountsController.uploadJournal);

module.exports = router;
