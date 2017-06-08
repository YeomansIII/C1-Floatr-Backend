const Controller = require('../../lib/controller');
const loanOfferModel = require('./loan-offer-facade');
const LoanOffer = require('./loan-offer-schema');
const utils = require('../../utils/utils');

class LoanOfferController extends Controller {
  initiate(req, res, next) {
    var body = req.body;
    if (!utils.hasIt(body, 'initiate_value')) {
      res.json({
        error: "initiate_value cannot be null/empty"
      });
    }

    LoanOffer.findById(req.params.id, (err, loanOffer) => {
      if (loanOffer.status !== 'waiting') {
        res.json({
          error: "loan-offer status must be 'waiting'"
        });
      }
      if (body.initiate_value < loanOffer.min_offer || body.initiate_value > loanOffer.max_offer) {
        res.json({
          error: "initiate_value must be between min_offer and max_offer"
        });
      }
      loanOffer.loanee = req.user;
      loanOffer.initiate_value = body.initiate_value;
      loanOffer.status = 'initiated';
      loanOffer.save((err) => {
        LoanOffer.populate(loanOffer, {
          path: "loaner"
        }, function(err, loanOffer2) {
          res.send(loanOffer2);
        });
      });
    });
  }
}

module.exports = new LoanOfferController(loanOfferModel);
