const Model = require('../../lib/facade');
const loanSchema  = require('./loan-schema');


class LoanModel extends Model {
	find(query) {
    	return this.Schema
    	.find(query)
    	.exec();
  	}
}

module.exports = new LoanModel(loanSchema);
