const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const loanOfferSchema = new Schema({
  loaner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  loaner_bank_account: {
    type: String
  },
  loanee_bank_account: {
    type: String
  },
  loanee: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  initiate_value: {
    type: Number
  },
  min_offer: {
    type: Number,
    required: true
  },
  max_offer: {
    type: Number,
    required: true
  },
  interest_rate: {
    type: Number,
    min: 0,
    required: true
  },
  period: {
    type: Number,
    min: 1,
    required: true
  },
  period_unit: {
    type: String,
    enum: ['day', 'week', 'month', 'year'],
    required: true
  },
  status: {
    type: String,
    enum: ['waiting', 'initiated', 'confirmed'],
    required: true,
    default: 'waiting'
  }
});


module.exports = mongoose.model('LoanOffer', loanOfferSchema);
