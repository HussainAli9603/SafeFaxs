var express = require('express');
var Users = require('./scripts/userscript');
var passport = require('passport');
let jwt = require('jsonwebtoken');
var LocalStrategy = require("passport-local");
var User = require("../models/user");

var router = express.Router();

router.get('/',(req,res)=>{
	 Users.Welcome(req,res);
});


router.post('/login/user', passport.authenticate('user', {
}),  function(req, res) {
    
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    res.send('LOGINNNNNN')
    
   });


router.get('/app-user-logout/:userId', (req, res) => {
    Users.logoutUser(req, res);
});
router.post('/register/user', (req, res) => {
    Users.Register(req, res);
});
router.get('/user/profile/:userId', (req, res) => {
    Users.UserProfile(req, res);
});
router.post('/user/updateUserProfile/:userId', (req, res) => {
    Users.UserAddProfile(req,res);
});

router.get('/user/getUploadImages', (req, res) => {
    Users.UserUploadImage(req,res);
});
router.post('/user/uploads-Images', (req, res) => {
    Users.UserPostUploadImage(req,res);
});
router.post('/user/deleteImage', (req, res) => {
    Users.DeleteImage(req,res);
});


module.exports = router;

