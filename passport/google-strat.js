const passport = require('passport');
const GoogleStartegy = require('passport-google-oauth20').Strategy;
const conf = require('../config/google-config');

passport.use(
    'google',
    new GoogleStartegy(conf, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    })
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
