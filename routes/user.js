var express = require('express');
var Users = require('./scripts/userscript');
var passport = require('passport');
let jwt = require('jsonwebtoken');
var LocalStrategy = require("passport-local");
// var User = require("../models/user");
let TopWorld = require("../models/top-world");
let TopRussia = require("../models/top-russia");
var timeout = require('connect-timeout')

var router = express.Router();

// router.get('/top-worlds',(req,res)=>{
//      res.render('home/top-world')
// });

router.get('/top-worlds',(req,res)=>{
	 Users.PostTopWorlds(req,res);
});
router.get('/Users/:username',(req,res)=>{
	 TopWorld.findOne({username:req.params.username},function(err,tops){
       res.render('home/userDetails',{
          tops:tops
       });

     })
});
router.get('/Top-250-russia',(req,res)=>{
   Users.PostTop250Russia(req,res);
});
router.get('/user/:username',(req,res)=>{
	   TopRussia.findOne({username:req.params.username},function(err,tops){
       res.render('home/RussiaUserDetails',{
          tops:tops
       });

     })
});

router.get('/rooms',(req,res)=>{
   Users.Rooms(req,res);
});
router.get('/rooms/:id',(req,res)=>{
   Users.RoomId(req,res);
});
router.get('/users-detail/:id',(req,res)=>{
   Users.RoomUserDetail(req,res);
});

router.get('/rooms/russia-room',(req,res)=>{
   Users.RussiaRooms(req,res);
});  




module.exports = router;

