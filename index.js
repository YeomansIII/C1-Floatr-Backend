const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bluebird = require('bluebird');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jwt-simple');

const config = require('./config');
const routes = require('./routes');
const secrets = require('./secrets');


const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

var User = require('./model/user/user-schema');
passport.use(new LocalStrategy(User.authenticate()));
passport.use(new BearerStrategy(
    function (token, done) {
        var decodedPayload = jwt.decode(token, secrets.secret_token);
        User.findOne({_id: decodedPayload._id}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user, {scope: 'all'});
        });
    }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'html');
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(passport.initialize());
app.use('/', routes);


app.listen(config.server.port, () => {
    console.log(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
