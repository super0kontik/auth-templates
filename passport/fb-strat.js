const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
        clientID: '------',
        clientSecret: '------',
        callbackURL: '/return'
    },
    (accessToken, refreshToken, profile, cb) => {
        // data may be inserted into db
        return cb(null, profile);
    }));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});