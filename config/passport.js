'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    connection.query("select * from users where id = "+ id, function (err, rows){
      done(err, rows[0]);
  });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    
    User.findOne({'email': email}, (err, user) => {
       if(err){
           return done(err);
       }
        
        if(user){
            return done(null, false, req.flash('error', 'User with email already exist'));
        }
        
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.fullname = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        
        newUser.save((err) => {
            done(null, newUser);
        });
    });
}));


passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    
     con.query("select * from users where email = ?", [email],async function(err, rows){
          if(err){
            console.log(err);
            
          }
        
       if(rows != null && rows[0] !=undefined){
            console.log(rows[0]);
          if(rows[0].password){
            const match = await bcrypt.compare(password,rows[0].password)
            if(match){
              return done(null,rows);
            }
            else{
              return done(null,false,'Incorrect user')
            }
          }
          else{
            return done(null,false,'Incorrect user')
          }
          }
        
        return done(null, user);
    });
}));































