const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./mock-data');

passport.use('login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, cb) => {
    console.log('in login')
        const user = users.find(item=>item.email===email && item.password===password);//db requests instead
        if (!user) {
            return cb(null, false,{message:'Wrong auth data'});
        }
        return cb(null, {id:user.id, email:user.email});
    }
));