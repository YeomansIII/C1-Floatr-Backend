const Model = require('../../lib/facade');
const paymentSchema  = require('./payment-schema');

class PaymentModel extends Model {
	create(input, activeUser) {
    return new Promise((resolve, reject) => {
      input.loanee = activeUser._id;
      const loanOffer = new paymentSchema(input);
      loanOffer.save((err) => {
        paymentSchema.populate(loanOffer, [
					{path: "loaner"},
					{path: "loanee"},
					{path: "loan"}
				], function(err, loanOffer2) {
          console.log(loanOffer2);
          resolve(loanOffer2);
        });
      });
    } );
  }
	find(query) {
    	return this.Schema
    	.find(query)
    	.populate('loan')
    	.populate('loaner')
			.populate('loanee')
    	.exec();
  	}
}

module.exports = new PaymentModel(paymentSchema);
