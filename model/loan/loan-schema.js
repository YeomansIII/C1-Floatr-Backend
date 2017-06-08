const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const loanSchema = new Schema({
  loaner: { type: Schema.ObjectId, ref: 'User', required: true },
  loaner_bank_account: { type: String, required: true },
  loanee: { type: Schema.ObjectId, ref: 'User', required: true },
  principle: { type: Number, required: true },
  interest_rate: { type: Number, min: 0, required: true },
  minimum_payment: { type: Number, min: 0 },
  next_payment: { type: Number, min: 0 },
  next_payment_due_date: { type: Date },
  remaining_amount: { type: Number, min: 0 },
  period: { type: Number, min: 1, required: true },
  period_unit: { type: String, enum: ['day', 'week', 'month', 'year'], required: true},
  status: { type: String, enum: ['in_progress', 'complete', 'overdue'], required: true},
  payments: { type: [Number] },
  payment_transfers: { type: [String] },
  principle_transfer: { type:String }
});


module.exports = mongoose.model('Loan', loanSchema);
