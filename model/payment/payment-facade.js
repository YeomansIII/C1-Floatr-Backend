const Model = require('../../lib/facade');
const paymentSchema  = require('./payment-schema');


class PaymentModel extends Model {}

module.exports = new PaymentModel(paymentSchema);
