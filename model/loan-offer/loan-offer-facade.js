const Model = require('../../lib/facade');
const loanOfferSchema  = require('./loan-offer-schema');


class LoanOfferModel extends Model {}

module.exports = new LoanOfferModel(loanOfferSchema);
