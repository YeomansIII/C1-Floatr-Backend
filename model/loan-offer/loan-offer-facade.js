const Model = require('../../lib/facade');
const loanOfferSchema = require('./loan-offer-schema');
const LoanOffer = require('./loan-offer-schema');


class LoanOfferModel extends Model {
  create(input, activeUser) {
    return new Promise((resolve, reject) => {
      input.loaner = activeUser._id;
      const loanOffer = new LoanOffer(input);
      loanOffer.save((err) => {
        LoanOffer.populate(loanOffer, {
          path: "loaner"
        }, function(err, loanOffer2) {
          resolve(loanOffer2);
        });
      });
    } );
  }
  findById(id) {
    return loanOfferSchema
      .findById(id)
      .populate('loaner')
      .populate('loanee')
      .exec();
  }
  find(query) {
    return loanOfferSchema
      .find(query)
      .populate('loaner')
      .populate('loanee')
      .exec();
  }
}

module.exports = new LoanOfferModel(loanOfferSchema);
