const { Router } = require('express');
const authorization = require('./middlewares/authorization');
const router = Router();
const accountsController = require('./controllers/accountsController')
const turnoverController = require('./controllers/turnoverController')
const usersController = require('./controllers/usersController')

router.get('/get-accounts', accountsController.getAccounts);
router.get('/get-turnover/:slug', turnoverController.getAnnualTurnover);
router.post('/post-monthly-turnover', turnoverController.getMonthlyTurnover);
router.post('/turnover-by-destinations', turnoverController.getTurnoverByDestinations);
router.post('/compare-fiscal-years', turnoverController.compareFiscalYears);
router.post('/upload-trial-balance', accountsController.uploadTrialBalance);
router.post('/upload-journal', accountsController.uploadJournal);
router.post('/stacked-turnover', turnoverController.getStackedTurnover);

//USERS
router.post('/users/create-user', usersController.signup);
router.post('/users/login', usersController.login);
router.get('/users/logout', authorization, usersController.logout);

//TEST
router.post('/setcookie', usersController.login)

module.exports = router;
