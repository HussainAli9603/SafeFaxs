let mongoose = require('mongoose');

let RussiaRoomUserDetailSchema = new mongoose.Schema({

    userId: {
        type: String,
    },
    userDetail: {
        type: String,
    },
     name: {
        type: String,
    },
    followers :{
       type: String
    },
    username :{
        type: String
    },
    img1:{
      type: String
    },
    
     local:{
        type:String,
        default:"1"
     }
   
},{ timestamps: true });

module.exports = mongoose.model('RussiaRoomUserDetail', RussiaRoomUserDetailSchema);