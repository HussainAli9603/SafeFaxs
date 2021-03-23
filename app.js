var PORT = process.env.PORT || 9000;
  bodyParser = require("body-parser"),
  path = require('path');
  express = require("express"),
  mongoose = require("mongoose"),
  objectID = require('mongoose').Types.ObjectId,
  // bcrypt = require('bcryptjs'),
  cors = require("cors"),
  fs = require('fs'),
  app = require('express')();
// let admin = require('firebase-admin');
var MONGOURL = require('./config/database');
var http = require('http');
var server = http.createServer(app);
const livereload = require("livereload");
const connectLivereload = require("connect-livereload")




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
index = require('./routes/index');
// cornJobRoute = require('./routes/cronJobs');
// adminRouter = require('./routes/admin/index');
// adminUser = require('./models/adminuser');
// User = require('./models/user');
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

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, '/routes/user'));
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/top-worlds");
  }, 100);
});

app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

let dbUser = process.env.DB_USERNAME;
let dbPass = process.env.DB_PASSWORD;
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.ykipt.mongodb.net/ClubScraping?retryWrites=true&w=majority`,{
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


// app.use(cors());
/* app.use(helmet()); */
app.use(express.static("public"));

app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use(function (req, res, next) {
  res.removeHeader('X-Powered-By');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(index);
app.use(connectLivereload());
// app.use(adminRouter);

//server.listen(3001);
server.listen(PORT, () => {
  console.log("Server is Listening on port :", PORT);
});

// I created three different types of project in your requirement and the last you say cancel the order 
// and then  this is not my requirement   you say create a web app I create  web app  and then you say create the app
// I worked very hard on your project  
