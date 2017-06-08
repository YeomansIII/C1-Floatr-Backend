const Model = require('../../lib/facade');
const loanOfferSchema  = require('./loan-offer-schema');


class LoanOfferModel extends Model {
	create(input) {
    	const schema = new this.Schema(input);
    	return schema.save((err) => {
    		return this.Schema
    	.findById(schema.id)
    	.populate('loaner')
    	.exec();
    	});
  	}
  	findById(id) {
    	return this.Schema
    	.findById(id)
    	.populate('loaner')
    	.exec();
  	}
	find(query) {
		console.log("Hi");
    	return this.Schema
    	.find(query)
    	.populate('loaner')
    	.exec();
  	}
}

module.exports = new LoanOfferModel(loanOfferSchema);
