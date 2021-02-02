let express = require('express');
let passport = require('passport');
const AdminUserScript = require('./scripts/AdminUserScript');
let router = express.Router();
adminUserScript = require('./scripts/AdminUserScript');


// router.post('/admin/login', passport.authenticate('local', {
   
// }),  function(req, res) {
    
//     if (req.body.remember) {
//       req.session.cookie.maxAge = 1000 * 60 * 3;
//     } else {
//       req.session.cookie.expires = false;
//     }
//     res.redirect("/admin/Dashboard")
    
//    });
router.post('/admin/login',function(req,res,next){
   passport.authenticate('local',{
      successRedirect:'/admin/dashboard',
      failureRedirect:'/admin',
      // failureFlash:"error",


   })(req,res,next);
});

router.get('/admin', (req, res) => {
    adminUserScript.Login(req, res);
});
router.get('/admin/app-admin-logout/:adminId',isLoggedIn, (req, res) => {
    adminUserScript.logoutAdmin(req, res);
});
router.get('/admin/dashboard',isLoggedIn, (req, res) => {
    adminUserScript.Dashboard(req, res);
});
// router.get('/admin',isLoggedIn, (req, res) => {
//     adminUserScript.adminGetLogin(req, res);
// });
// router.post('/admin',isLoggedIn, (req, res) => {
//     adminUserScript.adminLogin(req, res);
// });
router.post('/admin/register', (req, res) => {
    adminUserScript.adminRegister(req, res);
});
router.get('/admin/adminProfile/:adminId',isLoggedIn, (req, res) => {
    adminUserScript.AdminProfile(req, res);
});
router.post('/admin/updateAdminProfile/:adminId',isLoggedIn, (req, res) => {
    adminUserScript.AdminAddProfile(req,res);
});
router.get('/admin/country',isLoggedIn,(req, res) => {
    adminUserScript.ViewAllCountries(req, res);
});
router.post('/admin/country/add',isLoggedIn, (req, res) => {
    adminUserScript.CreateCountry(req, res);
});
//edit country-management
router.get('/admin/edit/country/:id' ,isLoggedIn, (req,res) =>{
    adminUserScript.editCountry(req,res);
});
router.post('/admin/edit/country/:id',isLoggedIn,(req,res) =>{
    adminUserScript.saveUpdateCountry(req,res);
});
router.get('/admin/delete/country/:id',isLoggedIn, (req, res) => {
    adminUserScript.deleteCountry(req, res);
});
router.get('/admin/getAllRegisterUser', (req, res) => {
    adminUserScript.getAllRegisterUser(req, res);
});
router.get('/admin/user-profile', (req, res) => {
    adminUserScript.getUserProfile(req, res);
});








function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.redirect('/admin');
}


module.exports = router;