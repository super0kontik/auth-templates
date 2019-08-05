const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport/jwt-strat');
/* GET users listing. */

const Auth=(req,res,next)=>{
    if(req.get('Authorization')) {
        passport.authenticate('jwt', (err, user) => {
            if (user) {
                return next();
            }
        })(req, res)
    }else if(req.session.passport){
        return next();
    }else {
        return res.status(403).send('Access denied')
    }
};

router.use(Auth);

router.get('/', function(req, res, next) {
  res.send('Access to secure route granted');
});



module.exports = router;
