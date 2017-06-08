const Model = require('../../lib/facade');
const loanOfferSchema = require('./loan-offer-schema');
const LoanOffer = require('./loan-offer-schema');


class LoanOfferModel extends Model {
  create(input) {
    return new Promise((resolve, reject) => {
      const loanOffer = new LoanOffer(input);
      loanOffer.save((err) => {
        LoanOffer.populate(loanOffer, {
          path: "loaner"
        }, function(err, loanOffer2) {
          console.log(loanOffer2);
          resolve(loanOffer2);
        });
      });
    } );
  }
  findById(id) {
    return this.Schema
      .findById(id)
      .populate('loaner')
      .exec();
  }
  find(query) {
    return this.Schema
      .find(query)
      .populate('loaner')
      .exec();
  }
}

module.exports = new LoanOfferModel(loanOfferSchema);
