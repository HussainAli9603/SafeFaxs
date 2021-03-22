let mongoose = require('mongoose');

let RussiaRoomSchema = new mongoose.Schema({

    url: {
        type: String,
    },
    name: {
        type: String,
    },
    img1 :[{
       type: String
    }],
    users :{
        type: String
    },
    comment:{
      type: String
    },
    local:{
       type:String,
       default:"1"
    }
   
},{ timestamps: true });

module.exports = mongoose.model('RussiaRoom', RussiaRoomSchema);