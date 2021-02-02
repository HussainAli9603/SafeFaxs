var PORT = process.env.PORT || 9000;
let multer = require("multer"),
  bodyParser = require("body-parser"),
  path = require('path');
  express = require("express"),
  passport = require('passport'),
  LocalStrategy = require("passport-local"),
  mongoose = require("mongoose"),
  objectID = require('mongoose').Types.ObjectId,
  bcrypt = require('bcryptjs'),
  cors = require("cors"),
  fs = require('fs'),
  app = require('express')();
// let admin = require('firebase-admin');
var MONGOURL = require('./config/database');
var http = require('http');
var server = http.createServer(app);
let jwt = require("jsonwebtoken");
// var io = require('socket.io').listen(server);
// let Message = require('./models/message');
// let Conversation = require('./models/conversation');
// let AppNotifications = require('./models/notification');
let User = require('./models/user');
const helmet = require("helmet");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
index = require('./routes/index');
// cornJobRoute = require('./routes/cronJobs');
adminRouter = require('./routes/admin/index');
adminUser = require('./models/adminuser');
User = require('./models/user');
//old broker id we have to replace with the new one if database is flushed 5ee9b929c837a3191033d601

let options = {
  priority: 'high',
  timeToLive: 60 * 60 * 24
};

app.use(express.static(__dirname + '/public', { maxAge: '30 days' }));

app.use('/uploads', express.static(__dirname + '/uploads'));
// This folder is used for admin side
app.use('/admin', express.static(__dirname + '/admin'));
const fileUpload = require('express-fileupload');
require('dotenv').config();
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

let dbUser = process.env.DB_USERNAME;
let dbPass = process.env.DB_PASSWORD;
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.ykipt.mongodb.net/safeFax?retryWrites=true&w=majority`,{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
 .then(() => {
    console.log("Connected to the Database");
  })
  .catch(() => {
    console.log("Could not connected to Database");
  });

app.use(require("express-session")({
  secret: "funtime",
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// ---------------------------Admin User Passport--------------------------------
passport.use('local', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
},
  async function (req, email, password, done) { // callback with email and password from our form
    adminUser.findOne({ 'email': email },
      async function (err, user) {
        if (err)
          return done(err);
        if (!user) {
          console.log('User Not Found with username ' + email);
          return done(null, false, 'no user found');
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            user.onlineStatus = 1;
             const token = jwt.sign({id:user.id }, "secretkey",{expiresIn:'1h'});
        
          return done(null, user);
        }
        else {
          return done(null, false, 'Incorrect Password.');
        }
      })

  }));
// --------------------------- User Passport--------------------------------
passport.use('user', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
},
  async function (req, email, password, done) { // callback with email and password from our form
    User.findOne({ 'email': email },
      async function (err, users) {
        if (err)
          return done(err);
        if (!users) {
          console.log('User Not Found with username ' + email);
          return done(null, false, 'no user found');
        }
        const match = await bcrypt.compare(password, users.password);
        if (match) {
            users.onlineStatus = true;
             const token = jwt.sign({id:users.id }, "secretkey",{expiresIn:'1h'});
             User.findOneAndUpdate({"email":email},{
                   $set:{
                          "token":token,
                          "onlineStatus":true,
                          "status":true,
                       } 

             },function(err,result){
               return done(null, users);
             })
                    
        
         
        }
        else {
          return done(null, false, 'Incorrect Password.');
        }
      })

  }));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  adminUser.findById({ _id: id }).
  exec(function (err, admin) {
     if (err) return done(err);
     if (admin) return done(null, admin);
      User.findById(id, function(err, user) {
            done(err, user);
        });
  });
  /* adminUser.findById(id, function (err, user) {
    done(err, user);
  }); */
});
app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.locals.currentUser = req.user;
  next();
});

app.use(cors());
/* app.use(helmet()); */
//app.use(express.static("public"));

app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));


app.use(index);
app.use(adminRouter);

//server.listen(3001);
server.listen(PORT, () => {
  console.log("Server is Listening on port :", PORT);
});
