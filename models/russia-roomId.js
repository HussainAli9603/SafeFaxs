let mongoose = require('mongoose');

let russiaRoomIdSchema = new mongoose.Schema({

    url: {
        type: String,
    },
    name: {
        type: String,
    },
    room :{
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

module.exports = mongoose.model('RussiaRoomId', russiaRoomIdSchema);