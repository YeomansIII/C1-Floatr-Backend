const Controller = require('../../lib/controller');
const loanOfferModel = require('./loan-offer-facade');
const LoanOffer = require('./loan-offer-schema');
const Loan = require('../loan/loan-schema');
const User = require('../user/user-schema');
const utils = require('../../utils/utils');
const secrets = require('../../secrets');
const request = require('superagent')

class LoanOfferController extends Controller {
  initiate(req, res, next) {
    var body = req.body;
    if (!utils.hasIt(body, 'initiate_value')) {
      res.json({
        error: "initiate_value cannot be null/empty"
      });
    } else if (!utils.hasIt(body, 'loanee_bank_account')) {
      res.json({
        error: "loanee_bank_account cannot be null/empty"
      });
    } else {
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
        loanOffer.loanee_bank_account = body.loanee_bank_account;
        loanOffer.status = 'initiated';
        loanOffer.save((err) => {
          LoanOffer.populate(loanOffer, {
            path: "loaner"
          }, (err, loanOffer2) => {
            res.send(loanOffer2);
          });
        });
      });
    }
  }

  confirm(req, res, next) {
    LoanOffer.findById(req.params.id, (err, loanOffer) => {
      if (loanOffer.status !== 'initiated') {
        res.json({
          error: "loan offer must be initiated"
        });
      } else if (!loanOffer.loaner.equals(req.user._id)) {
        res.json({
          error: "you do not have permission to confirm this"
        });
      } else {
        User.findById(loanOffer.loaner, (err, loaner) => {
          var loan = new Loan({
            loaner: loanOffer.loaner,
            loaner_bank_account: loaner.bank_accounts[0],
            loanee: loanOffer.loanee,
            principle: loanOffer.initiate_value,
            interest_rate: loanOffer.interest_rate,
            remaining_amount: loanOffer.initiate_value,
            period: loanOffer.period,
            period_unit: loanOffer.period_unit,
            status: 'in_progress'
          });
          var nessie_url = secrets.nessie_url_prefix + "accounts/" + loan.loaner_bank_account + "/transfers" +
            "/?key=" + secrets.nessie_key;
          request.post(nessie_url)
            .send({
              medium: "balance",
              payee_id: loanOffer.loanee_bank_account,
              amount: loan.principle,
              transaction_date: utils.getDate(),
              description: "Floatr principle transfer"
            })
            .set('Accept', 'application/json')
            .end((err, res2) => {
              if (err) handleError(err);
              loanOffer.status = 'confirmed';
              loanOffer.save();
              loan.principle_transfer = res2.body.objectCreated._id;
              loan.save((err) => {
                Loan.populate(loan, [{
                  path: 'loaner'
                }, {
                  path: 'loanee'
                }], (err, loan2) => {
                  res.send(loan2);
                });
              });
            });
        });
      }
    });
  }
}

module.exports = new LoanOfferController(loanOfferModel);
