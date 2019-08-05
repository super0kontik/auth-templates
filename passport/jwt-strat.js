const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const users = require('./mock-data');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use('jwt',new JwtStrategy(opts,(jwt_payload, done) => {
    console.log(jwt_payload);
    //console.log('in login')
    const user = users.find(item=>item.id===jwt_payload.id);//db requests instead
    console.log(user)
    if (!user) {
         done(null, false);
    }
     done(null, {id:user.id, email:user.email});
}));