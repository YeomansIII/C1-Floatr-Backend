const Model = require('../../lib/facade');
const paymentSchema  = require('./payment-schema');


class PaymentModel extends Model {
	find(query) {
    	return this.Schema
    	.find(query)
    	.populate('loan')
    	.populate('loaner')
    	.exec();
  	}
}

module.exports = new PaymentModel(paymentSchema);
