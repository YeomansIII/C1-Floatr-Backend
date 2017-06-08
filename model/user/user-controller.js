const Controller = require('../../lib/controller');
const userModel = require('./user-facade');
const request = require('superagent');
const secrets = require('../../secrets');
const LoanOffer = require('../loan-offer/loan-offer-schema');
const Loan = require('../loan/loan-schema');
// "secrets.var"
const utils = require('../../utils/utils');

class UserController extends Controller {

  // put:
  //  - DO NOT change: customer_id, first_name, last_name
  //  - DO change: email, loans, rating, avatar_url,
  //    offers, requests, status
  rate(req, res, next) {
    var body = req.body;
    if (!utils.hasIt(body, 'rating')) {
      res.json({
        error: "rating cannot be null/empty."
      })
    }

    userModel.findById(req.params.id, (err, user) => {
      if (err) return handleError(err);
      var avg = user.rating;
      var num = user.num_ratings + 1;
      var new_avg = avg * (num / (num + 1)) + body.rating / (num + 1);
      user.rating = new_avg;
      user.save((err, updated_user) => {
        if (err) return handleError(err);
        res.send(updated_user);
      });
    });
  }
  put(req, res, next) {
    var body = req.body;
    if (!utils.hasIt(body, 'customer_id')) {
      res.json({
        error: "customer_id cannot be null/empty."
      });
    }
    var user = User.findOne({
      "customer_id": body.customer_id
    });
    if (user == null) {
      res.json({
        error: "Attempted to modify non-existent user - " + body.customer_id + "."
      });
    }
    if (utils.hasIt(body, 'email')) {
      user.email = body.email;
    }

    if (utils.hasIt(body, 'loan')) {
      user.loans.push(body.loan);
    }

    if (utils.hasIt(body, 'rating')) {
      if (body.rating > 5 || body.rating < 0) {
        res.json({
          error: "Rating must be within range 0 to 5 (inclusive)."
        })
      }
      user.rating = (user.num_ratings * user.rating + body.rating) / (user.num_ratings + 1);
      user.num_ratings++;
    }

    if (utils.hasIt(body, 'avatar_url')) {
      user.avatar_url = req.avatar_url;
    }

    if (utils.hasIt(body, 'offer')) {
      user.offers.push(req.offer);
    }

    /*if (req.hasOwnProperty('request')) {
      user.requests.push(req.request);
    }*/

    if (utils.hasIt(body, 'status')) {
      // check that status is valid
      var statuses = User.schema.path('status').enumValues;
      if (statuses.includes(req.status)) {
        user.status = req.status;
      } else {
        res.json({
          error: "Invalid status code - " + req.status + "."
        })
      }
    }
  }

  userOffers(req, res, next) {
    LoanOffer
      .find({
        loaner: req.user._id
      })
      .populate('loaner')
      .populate('loanee')
      .exec((err, offers) => {
        res.send(offers);
      });
  }

  userLoans(req, res, next) {
    Loan
      .find({
        $or: [{
            loaner: req.user._id
          },
          {
            loanee: req.user._id
          }
        ]
      })
      .populate('loaner')
      .populate('loanee')
      .exec((err, offers) => {
        res.send(offers);
      });
  }

  // get:
  //  - GET: first_name, last_name, offers, requests,
  //    rating, avatar_url

}

module.exports = new UserController(userModel);
