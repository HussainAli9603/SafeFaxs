let mongoose = require('mongoose');

let topItalySchema = new mongoose.Schema({

    followers: {
        type: String,
    },
    name :{
       type: String
    },
    img:{
       type:String
    },
     local:{
       type:String,
       default:"1"
    }
   
},{ timestamps: true });

module.exports = mongoose.model('topItaly', topItalySchema);