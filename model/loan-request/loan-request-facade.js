const Model = require('../../lib/facade');
const loanRequestSchema  = require('./loan-request-schema');


class LoanRequestModel extends Model {}

module.exports = new LoanRequestModel(loanRequestSchema);
