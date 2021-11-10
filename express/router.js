const { Router } = require('express');
const router = Router();
const accountsController = require('./controllers/accountsController')
const turnoverController = require('./controllers/turnoverController')

router.get('/get-accounts', accountsController.getAccounts);
router.get('/get-turnover/:slug', turnoverController.getAnnualTurnover);
router.post('/post-monthly-turnover', turnoverController.getMonthlyTurnover);
router.post('/turnover-by-destinations', turnoverController.getTurnoverByDestinations);
router.post('/compare-fiscal-years', turnoverController.compareFiscalYears);
router.post('/upload-trial-balance', accountsController.uploadTrialBalance);
router.post('/upload-journal', accountsController.uploadJournal);
router.post('/stacked-turnover', turnoverController.getStackedTurnover);

module.exports = router;
