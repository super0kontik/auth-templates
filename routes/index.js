const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../passport/register');
require('../passport/login');
require('../passport/fb-strat');
require('../passport/linkedIn-strat');
require('../passport/google-strat');

router.get('/', (req, res) =>{
  res.send('Homepage!');
});


router.post('/',(req, res) =>{
    passport.authenticate('login', (err,user,info)=>{
        if(err){
            console.log(err);
            return res.status(500).send('Server error')
        }
        if(info){
            return res.status(401).send(info.message)
        }
        res.json({
            message : 'Signin successful',
            token : jwt.sign(user, 'secret')
        });
    })(req,res);
});

router.post('/register',(req, res) =>{
    passport.authenticate('register', (err,user,info)=>{
        if(err){
            console.log(err);
            return res.status(500).send('Server error')
        }
        if(info){
            return res.status(400).send(info.message)
        }
        res.json({
            message : 'Signup successful',
            token : jwt.sign(user, 'secret')
        });
    })(req,res);
});


router.get('/facebook', passport.authenticate('facebook'));

router.get('/return',
    passport.authenticate('facebook', {  successRedirect: '/users', failureRedirect: '/' }),
    (req, res)=>{
        res.send(req.user);
    });


router.get('/linkedIn', passport.authenticate('linkedin'));

router.get('/callback', passport.authenticate('linkedin', {successRedirect: '/users', failureRedirect: '/'}));

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile']
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),(req, res) => {
        res.send(req.user)
     }
);

router.get('/logout', (req, res) =>{
    req.session.destroy( (err) => {
        res.redirect('/');
    });
});

module.exports = router;
