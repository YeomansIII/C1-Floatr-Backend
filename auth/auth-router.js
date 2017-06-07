const Router = require('express').Router;
const router = new Router();
const passport = require('passport');
const User = require('../model/user/user-schema')
const jwt = require('jwt-simple');
const secrets = require('../secrets');
const utils = require('../utils/utils');

router.route('/register')
    // post:
    //  - populate bank_accounts with accounts belonging to
    //    this customer_id
    //  - populate first_name and last_name with the ones associated
    //    with this user's customer_id
    .post(function(req, res) {
        utils.populateCustomer(req, res, function(data) {
            var combined = Object.assign(data, req.body);
            User.register(new User(
                combined
            ), req.body.password, function(err, user) {
                if (err) {
                    console.log(err);
                    return res.json({
                        error: err.message
                    });
                }

                passport.authenticate('local')(req, res, function() {
                    console.log(req.user);
                    return res.json({
                        token: jwt.encode({
                            username: req.user.username,
                            _id: req.user._id
                        }, secrets.secret_token),
                        username: req.user.username,
                        _id: req.user._id
                    });
                });
            });
        });
    });

router.route('/login')
    .post(passport.authenticate('local'), function(req, res) {
        console.log(req.user);
        return res.json({
            token: jwt.encode({
                username: req.user.username,
                _id: req.user._id
            }, secrets.secret_token),
            username: req.user.username,
            _id: req.user._id
        });
    });

router.route('/logout')
    .post(function(req, res) {
        req.logout();
        res.redirect('/');
    });

module.exports = router;
