const Controller = require('../../lib/controller');
const loanOfferModel  = require('./loan-offer-facade');


class LoanOfferController extends Controller {}

module.exports = new LoanOfferController(loanOfferModel);
