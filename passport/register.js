const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./mock-data');

passport.use('register',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    (req,email, password, cb) => {
        const user = users.find(item=>item.email===email);
        if (user) {
            return cb(null, false, {message:'Email already taken'});
        }
        if(!password){
            return cb(null, false, {message:'Password isnt provided'});
        }
        if(req.body.passwordConfirm !== req.body.password){
            return cb(null, false, {message:'Passwords dont match'});
        }
        console.log('registered');
        // push to db
        const mockId = 101;
        return cb(null, {mockId,email});
    }
));