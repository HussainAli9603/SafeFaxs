let mongoose = require('mongoose');

let topWorldSchema = new mongoose.Schema({

    url: {
        type: String,
    },
    followers: {
        type: String,
    },
    name :{
       type: String
    },
    username :{
        type: String
    },
    rate :{
        type: String
    },
    bio:{
      type: String
    },
    img:{
       type:String
    }
   
},{ timestamps: true });

module.exports = mongoose.model('topWorld', topWorldSchema);