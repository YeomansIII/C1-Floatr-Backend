const Controller = require('../../lib/controller');
const loanRequestModel  = require('./loan-request-facade');


class LoanRequestController extends Controller {}

module.exports = new LoanRequestController(loanRequestModel);
