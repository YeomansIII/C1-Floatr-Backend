const Router = require('express').Router;
const router = new Router();

const user  = require('./model/user/user-router');
const loan  = require('./model/loan/loan-router');
const loanOffer  = require('./model/loan-offer/loan-offer-router');
//const loanRequest  = require('./model/loan-request/loan-request-router');
const payment  = require('./model/payment/payment-router');
const auth  = require('./auth/auth-router');


router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to Floatr API!' });
});

router.use('/user', user);
router.use('/loan', loan);
router.use('/loan-offer', loanOffer);
//router.use('/loan-request', loanRequest);
router.use('/payment', payment);
router.use('/auth', auth);

module.exports = router;
