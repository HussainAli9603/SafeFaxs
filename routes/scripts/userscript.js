let User = require("../../models/user");
let ImageFiles = require("../../models/file-image-upload");
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let fs = require('fs');
let async = require('async');
let multer = require('multer');
let mkdir = require('mkdir');

let jwtconfig = require('../../config/jwtconfig');

let connection = require('../../config/database');

const saltRounds = 10;

let options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
  };

 module.exports = {
 	Welcome:async (req,res)=>{
       res.send("Welcome")
 	},

  Register: async function (req, res) {
    //let OTPCODE = await Math.floor(1000 + Math.random() * 9000);
     if (req.body.fullName == undefined || req.body.fullName == "") {
      return res.send({ Success: false, message: "Password is required!" });
    }
     if (req.body.companyName == undefined || req.body.companyName == "") {
      return res.send({ Success: false, message: "Password is required!" });
    }

    if (req.body && req.body.email != undefined && req.body.email != "") {
      let user = await User.findOne({email: req.body.email.toLowerCase().replace(/\s/g, "") });

      if (user != null && user != "") {
        return res.send({
          Success: false,
          message: "Username already exists!",
        });
      }
    } else {
      return res.send({ Success: false, message: "Email is required!" });
    }
    
    if (req.body.contactNumber == undefined || req.body.contactNumber == "") {
      return res.send({
        Success: false,
        message: "Contact Number is required!",
      });
    }
     if (isNaN(req.body.contactNumber)) {
      return res.send({
        Success: false,
        message: "Phone number must be a number!",
      });
    }

    if (req.body.password == undefined || req.body.password == "") {
      return res.send({ Success: false, message: "Password is required!" });
    }
     if (req.body.password != req.body.cpassword) {
      return res.send({ Success: false, message: "Password and Confirm Password do not match" });
    }
   
    
    //let GeoCoderes = await geocoder.reverse({ lat: req.body.lat, lon:req.body.lng });
    
    let newUser = new User();
    let defaultProfilePic = "uploads/profile/default-pic.jpg";
    
    newUser.fullName = req.body.fullName;
    newUser.companyName = req.body.companyName;
    newUser.username = req.body.username.toLowerCase().replace(/\s/g, '');
    newUser.email = req.body.email.toLowerCase().replace(/\s/g, "");
    newUser.contactNumber = req.body.contactNumber;
    //newUser.countryId = req.body.countryId;
    newUser.lastLogin = new Date();
    newUser.profilePic = defaultProfilePic;
    //newUser.userPinCode = Number(req.body.userPinCode);
    let salt = bcrypt.genSaltSync(saltRounds);
    
    let hash = bcrypt.hashSync(req.body.password, salt);
    newUser.password = hash;
    console.log(newUser)
    newUser.save(async function (err, user) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ Success: true, user: user });
      }
    });
  },

    logoutUser: async (req, res) => {
    try {
      let user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.send({ Success: false, message: "User not found" });
      } else {
        user.onlineStatus = false;
        user.status = false;
        await user.save(function (err, user) {
          if (err) console.log(err);
          else
             return res.send({ Success: true, message: "Logout successfull!" });
           });
      }
    } catch (err) {
      console.log(err);
      res.send({ Success: false, err });
    }
  },

   UserProfile:async function(req,res){
        var user = req.params.userId;
        console.log(user)
        User.findOne({_id:user},function(err,user){
            res.send(user)
        })
    },

     UserAddProfile:async function(req,res){
        var id = req.params.userId;
       if (req.files && req.files.image) {
        let dir = './public/upload/user-profile-Pic/';

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

     User.findById(id,function(err,editUserProfile){
          editUserProfile.profilePic = imagePath;

             if(imagePath != ""){
                  editUserProfile.profilePic = imagePath;
              }
               editUserProfile.save(function (err, adminusers) {
                 if (err) res.send(err);
                 else res.send({ "success": true, "message": "Record  Updated Successfully!" })
                  
              })
     });

    },

    UserUploadImage:async function(req,res){
       ImageFiles.findOne({userId:req.user}).sort('-createdAt').limit(1).then(imagefiless=>{
         res.send(imagefiless)
       })
         
    },
    
    UserPostUploadImage:async function(req,res){

          if (req.files && req.files.images) {
            var ImagesArray = [];
            let dir = './public/upload/user-Images-uploads/';
            if (Array.isArray(req.files.images)) {
                for (const element of req.files.images) {
                    let sampleFile = element;
                  

                    var imagename = dir + Date.now() + "" + sampleFile.name;
                    await sampleFile.mv(imagename, function (err) {
                        if (err) {
                            console.log(err);
                            return res.status(500).send(err);
                        }
                    });
                    imagename = imagename.substring(9);
                    await ImagesArray.push(imagename);
                     
                }
            } //end of req.files array
               else {
                      let profileImage = req.files.images;
                      let imageUrl = dir + Date.now() + "" + profileImage.name;
                      await profileImage.mv(imageUrl, function (err) {
                         if (err)
                             console.log(err);
                            });
                          imageUrl = imageUrl.substring(9);
                          await ImagesArray.push(imageUrl);
                          } //end of req.files single image
            }

            let imagefiles = new ImageFiles();
            imagefiles.images = ImagesArray;
            imagefiles.userId = req.user
             imagefiles.save(function (err, imagefile) {
              console.log(imagefile)
                if(err){
                    console.log(err);
                }
                return res.send('Images uploaded Successfully')
              });

    },

    DeleteImage:async function(req,res){
      // const imageName = req.params.image;
      // ImageFiles.updateOne({ _id: req.params.id }, { $pull: { images: { image: imageName }} });
    // var originalImage = './public/upload/user-Images-uploads/'+ req.params.image;
    // console.log(req.params.image)

    // fs.unlinkSync(originalImage, function (err) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //        res.send("Image Deleted Successfully")
    //     }
    // });
    
     // var originalImage = req.params.image;
    try {
            let imageId = await ImageFiles.findOne({ _id: req.body.imageId });
            if (imageId != null) {
                let dir = './public/';
                fs.unlink(dir + '' + req.body.imagePath, (err) => {
                    if (err) console.log(err);
                });
                imageId.images.pull(req.body.imagePath);
                imageId.save(function (err, user) {
                    if (err) return res.send(err);
                    else return res.send({ "Success": true, "message": req.body.imageId })
                })
            }
            else {
                return res.send({ "Success": false, "message": "Image is missing!" })
            }
        } catch (error) {
            return res.send({ "Success": false, "message": error.message })
        }
        
  

         
    },
    

 }












