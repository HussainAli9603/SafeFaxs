let mongoose = require('mongoose');

let ItalyUserDetailSchema = new mongoose.Schema({

    // userDetail: {
    //     type: String,
    // },
     name: {
        type: String,
    },
    followers :{
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

module.exports = mongoose.model('ItalyUserDetail', ItalyUserDetailSchema);