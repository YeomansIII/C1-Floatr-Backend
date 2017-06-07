const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const paymentSchema = new Schema({
  loan: { type: Schema.ObjectId, ref: 'Loan', required: true },
  loanee_bank_account:  { type: String, required: true },
  loaner: { type: Schema.ObjectId, ref: 'User', required: true},
  amount: { type: Number, required: true},
  date: { type: Date, required: true},
  success: { type: Boolean }
});


module.exports = mongoose.model('Payment', paymentSchema);
