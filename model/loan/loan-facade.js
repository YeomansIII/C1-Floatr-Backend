const Model = require('../../lib/facade');
const loanSchema  = require('./loan-schema');


class LoanModel extends Model {}

module.exports = new LoanModel(loanSchema);
