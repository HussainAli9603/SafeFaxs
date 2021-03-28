let mongoose = require('mongoose');

let eventRussiaSchema = new mongoose.Schema({

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
    bio:{
      type: String
    },
     time:{
      type: String
    },
    local:{
       type:String,
       default:"1"
    }
   
},{ timestamps: true });

module.exports = mongoose.model('EventRussia', eventRussiaSchema);