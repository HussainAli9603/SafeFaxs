let mongoose = require('mongoose');

let adminUserSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    contactNumber: {
        type: Number
    },
    address:{
      type:String
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adminRoles",
    },
    password: {
        type: String
    },
    image:{
      type:String
    },
    token:{

    }
   
},{ timestamps: true });

module.exports = mongoose.model('adminUser', adminUserSchema)