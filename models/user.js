let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
     companyName: {
        type: String,
        unique: true
    }, 
    username: {
        type: String,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true

    },
    contactNumber: {
        type: Number,
        unique: true
    },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        default : null
    },
    password: {
        type: String,
    },
    status :{
        type: Boolean,
        default: false
    },
    onlineStatus :{
        type: Boolean,
        default: false
    },
    resetPasswordToken:{
        type : String
    },
    resetPasswordExpires:{
        type : String
    },
    profilePic:{
        type:String,
        // default: 'uploads/profile/default-pic.jpg'
    },
    lastLogin:{
        type:Date
    },
    token:{
        type:String
    }
   
},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);