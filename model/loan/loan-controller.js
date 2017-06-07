const Controller = require('../../lib/controller');
const loanModel  = require('./loan-facade');

class LoanController extends Controller {
  create(req, res, next) {
    // check that bank account belongs to loaner
    // add principle from loan-offer or loan-request
    // calculate next payment based on interest and principle
    // calculate initial 'next due date' based on
    //   date of loan start, period, and period unit
    // set remaining amount to principle
    // check that loaner can afford to give loan via Capital One API
    //
  }
}

module.exports = new LoanController(loanModel);
