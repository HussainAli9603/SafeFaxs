var express = require('express');
var Users = require('./scripts/userscript');
var passport = require('passport');
let jwt = require('jsonwebtoken');
var LocalStrategy = require("passport-local");
// var User = require("../models/user");
let TopWorld = require("../models/top-world");
let TopRussia = require("../models/top-russia");
// var timeout = require('connect-timeout')

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


router.get('/room/russia-rooms',(req,res)=>{
   Users.RussiaRoomss(req,res);  
});
router.get('/Russia-rooms/:id',(req,res)=>{
   Users.RussiaRoomId(req,res);
});  
router.get('/russia-users-detail/:id',(req,res)=>{
   Users.RussiaRoomUserDetail(req,res);
});


router.get('/events',(req,res)=>{
   Users.Events(req,res);  
});
router.get('/events/:id',(req,res)=>{
   Users.EventUserDetails(req,res);  
});
router.get('/event/user/:id',(req,res)=>{
   Users.EventOverUserDetails(req,res);  
});

router.get('/events-russia',(req,res)=>{
   Users.EventsRussia(req,res);  
});
router.get('/events-russia/:id',(req,res)=>{
   Users.EventRussiaUserDetails(req,res);  
});
router.get('/event-russia/user/:id',(req,res)=>{
   Users.EventRussiaOverUserDetails(req,res);  
});


router.get('/Top-250-italy',(req,res)=>{
   Users.PostTop250Italy(req,res);
});
router.get('/italy-user/:name',(req,res)=>{
   Users.ItalyUserDetails(req,res);  
});





module.exports = router;

