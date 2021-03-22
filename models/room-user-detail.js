let mongoose = require('mongoose');

let RoomUserDetailSchema = new mongoose.Schema({

    userId: {
        type: String,
    },
    userDetail: {
        type: String,
    },
    
     local:{
        type:String,
        default:"1"
     }
   
},{ timestamps: true });

module.exports = mongoose.model('RoomUserDetail', RoomUserDetailSchema);