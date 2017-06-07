const controller = require('./loan-request-controller');
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

module.exports = router;
