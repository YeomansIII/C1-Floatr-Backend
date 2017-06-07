const controller = require('./payment-controller');
const Router = require('express').Router;
const router = new Router();
const passport = require('passport');

router.route('/')
  .post(passport.authenticate('bearer', { session: false }), (...args) => controller.pay(...args));

router.route('/:id')
  .get(passport.authenticate('bearer', { session: false }), (...args) => controller.findById(...args));

module.exports = router;
