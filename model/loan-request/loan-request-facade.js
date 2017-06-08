const Model = require('../../lib/facade');
const loanRequestSchema  = require('./loan-request-schema');


class LoanRequestModel extends Model {
	find(query) {
    	return this.Schema
    	.find(query)
    	.populate('loanee')
    	.exec();
  	}
}

module.exports = new LoanRequestModel(loanRequestSchema);
