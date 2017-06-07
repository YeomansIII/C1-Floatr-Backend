const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const loanRequestSchema = new Schema({
  loanee: { type: Schema.ObjectId, ref: 'User', required: true },
  min_request: { type: Number, required: true },
  max_request: { type: Number, required: true },
  interest_rate: { type: Number, min: 0, required: true },
  period: { type: Number, min: 1, required: true },
  period_unit: { type: String, enum: ['day', 'week', 'month', 'year'], required: true},
});


module.exports = mongoose.model('LoanRequest', loanRequestSchema);
