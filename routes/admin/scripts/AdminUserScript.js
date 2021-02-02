let adminUser = require('../../../models/adminuser');
let AppUser = require('../../../models/user');
let Country = require('../../../models/country');

let bcrypt = require('bcryptjs');
let fs = require('fs');
let multer = require('multer');
let jwt = require('jsonwebtoken');
const saltRounds = 10;
let options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
  };
module.exports = {
    Login: async function (req, res) {
        res.render('admin/login');
        // show login page
    },
    // adminLogin: async (req, res) => {
    //     try {
    //         let user = await adminUser.findOne({ email: req.body.email });
    //         if (user.length < 1) {
    //             return res.send({ "message": "User Not Found" })
    //         }
    //         const match = await bcrypt.compare(req.body.password, user.password);
    //         let loginUser = user;
    //         if (match) {

    //             const token = jwt.sign({ loginUser }, "secretkey")
    //             // res.send({ "Success": true, token, user: loginUser });
    //             res.render('admin/index')

    //         } else {
    //             return res.send({ "Success": false, "message": "password is not correct" })
    //         }

    //     } catch (err) {
    //         res.send({ "Success": false, err })
    //     }

    // },
    adminRegister: async function (req, res) {
        if(req.body.fullName == undefined || req.body.fullName ==''){
            return res.send({ "Success": false, "message": "Name is required" })
        }
        if(req.body.email == undefined || req.body.email ==''){
            return res.send({ "Success": false, "message": "email is required" })
        }
        if(req.body.contactNumber == undefined || req.body.contactNumber ==''){
            return res.send({ "Success": false, "message": "contact Number is required" })
        }
        if(req.body.password == undefined || req.body.password ==''){
            return res.send({ "Success": false, "message": "Password is required" })
        }
        if(req.body.cpassword == undefined || req.body.cpassword ==''){
            return res.send({ "Success": false, "message": "Confirm Password is required" })
        }
        if(req.body.password != req.body.cpassword){
            return res.send({ "Success": false, "message": "Password did not match" })
        }
        // if(req.body.role == undefined || req.body.role ==''){
        //     return res.send({ "Success": false, "message": "User role is required" })
        // }
        let newUser = new adminUser();
        newUser.fullName = req.body.fullName;
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.contactNumber = req.body.contactNumber;
        newUser.roleId = req.body.role;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(req.body.password, salt);
        newUser.password = hash;
        console.log(newUser)
        newUser.save(function (err, user) {
            if (err) res.send(err);
            else res.send({ "Success": true, "message": "Your account has been created Successfully!" })
        })
    },

     logoutAdmin: async (req, res) => {
    try {
      let admin = await adminUser.findOne({ _id: req.params.adminId });
      if (!admin) {
        return res.send({ Success: false, message: "Admin User not found" });
      } else {
        admin.onlineStatus = false;
        await admin.save(function (err, admin) {
          if (err) console.log(err);
          else
            // return res.send({ Success: true, message: "Logout successfull!" });
          res.redirect('/admin')
        });
      }
    } catch (err) {
      console.log(err);
      res.send({ Success: false, err });
    }
  },

    Dashboard: async function (req, res) {
        Promise.all([
            adminUser.countDocuments({}),
            adminUser.findOne({_id:req.user}),
        ]).then(([users,adminId]) => {
               res.render('admin/index',{
                adminId:adminId,
                users:users
            });
        });
            
    },

    AdminProfile:async function(req,res){
        var admin = req.params.adminId
        adminUser.findOne({_id:admin},function(err,adminuser){
             res.render("admin/adminProfile",{adminId:req.user,adminuser:adminuser});
        })
    },
    
    AdminAddProfile:async function(req,res){
        var id = req.params.adminId;
        var fullname = req.body.fullname;
        var username = req.body.username;
        var email = req.body.email;
        var contactNumber = req.body.contactNumber;
        var password = req.body.password;
        var address = req.body.address;
        console.log(req.body)

 if (req.files && req.files.image) {
        let dir = './public/upload/profile-Pic/';

        let profilePic = req.files.image;
        let nowDate = Date.now();
        let iconUrl = dir + nowDate / 1000 + "" + profilePic.name;

        await profilePic.mv(iconUrl, async function (err) {
            if (err)
                console.log(err);
        });

        imagePath = iconUrl.substring(9);
        icon = imagePath;
    }else{
        imagePath = req.body.oldImage
    }

     adminUser.findById(id,function(err,editAdminProfile){
          editAdminProfile.fullName = fullname
          editAdminProfile.username = username
          editAdminProfile.email = email
          editAdminProfile.contactNumber = contactNumber
          editAdminProfile.password = password;
          editAdminProfile.address = address;
          editAdminProfile.image = imagePath;

             if(imagePath != ""){
                  editAdminProfile.image = imagePath;
              }
               editAdminProfile.save(function (err, adminusers) {
                 if (err) res.send(err);
                 // else res.send({ "success": true, "message": "Record inserted Successfully!" })
                  res.redirect(`/admin/adminProfile/${adminusers.id}`)
              })
     });

    },

     CreateCountry: async function (req, res) {
        let country = new Country();
        country.title = req.body.title;
        country.save(function (err, user) {
            if (err) res.send(err);
            res.render('admin/country-management', { adminId:req.user });
        })
    },

     ViewAllCountries: async function (req, res) {
        let countries = await Country.find({}).sort('-createdAt');
        res.render('admin/country-management', { countries,adminId:req.user });
    },
     editCountry: async function(req,res){
        let id = req.params.id;
        let countries = await Country.findById({_id:id}).sort('-createdAt');
        res.render("admin/editcountry-management",{
            countries,
            adminId:req.user
        })
    }, 

    saveUpdateCountry : async function(req,res){
        let id = req.params.id;
        let title = req.body.title;

        Country.findById({_id:id},(err,updateCountry)=>{
            if(err) return err;
            updateCountry.title = title;
            updateCountry.save(err=>{
                if(err){
                    console.log(err)
                }
                res.redirect('/admin/country')
                
            })
        })
    },


    deleteCountry: async function (req, res) {
        let countries = await Country.deleteOne({ _id: req.params.id });
       res.redirect('/admin/country');
   },

   getAllRegisterUser:async function(req,res){
      AppUser.find(function(err,users){
         res.render('admin/getAllRegisterUser',{
            users:users,
            adminId:req.user
         })
      })
   },

   getUserProfile:async function(req,res){
      AppUser.find(function(err,users){
         res.render('admin/user-profile',{
            users:users,
            adminId:req.user
         })
      })
   },


   

    


};