let mongoose = require('mongoose');

let ImageSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    images:[{
        type:String
    }],
   
},{ timestamps: true });

module.exports = mongoose.model('ImageFiles', ImageSchema);