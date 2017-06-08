const controller = require('./loan-offer-controller');
const Router = require('express').Router;
const router = new Router();
const passport = require('passport');

router.route('/')
  .get(passport.authenticate('bearer', { session: false }), (...args) => controller.find(...args))
  .post(passport.authenticate('bearer', { session: false }), (...args) => controller.create(...args));

router.route('/:id')
  .put(passport.authenticate('bearer', { session: false }), (...args) => controller.update(...args))
  .get(passport.authenticate('bearer', { session: false }), (...args) => controller.findById(...args))
  .delete(passport.authenticate('bearer', { session: false }), (...args) => controller.remove(...args));

router.route('/:id/initiate')
  .put(passport.authenticate('bearer', { session: false }), (...args) => controller.initiate(...args))

module.exports = router;
