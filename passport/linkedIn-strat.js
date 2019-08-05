const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({
    clientID: '------',
    clientSecret: '------',
    callbackURL: "/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
},(accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
        // data may be inserted into db
        return done(null, profile);
    });
}));