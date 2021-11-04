const { Router } = require('express');
const router = Router();
const accountsController = require('./controllers/accountsController')
const turnoverController = require('./controllers/turnoverController')

router.get('/get-accounts', accountsController.getAccounts);
router.get('/get-turnover', turnoverController.getTurnover);
router.post('/post-monthly-turnover', turnoverController.postMonthlyTurnover);
router.post('/upload-trial-balance', accountsController.uploadTrialBalance);
router.post('/upload-journal', accountsController.uploadJournal);

module.exports = router;
