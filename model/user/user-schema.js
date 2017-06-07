const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    bcrypt = require('bcrypt-nodejs');

//email no longer needed - username must be a unique email address
const userSchema = new Schema({
    first_name: { type: String},
    last_name: { type: String},
    customer_id: { type: String, required: true},
    bank_accounts: { type: [String]},
    offers: { type: Array},
    //requests: { type: Array},
    num_ratings: { type: Number, default: 0},
    rating: { type: Number, min: 0, max: 5, default: 0},
    avatar_url: { type: String},
    status: { type: String, enum: ['normal', 'suspended', 'banned'], required: true}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
