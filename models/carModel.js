const mongoose=require('mongoose');

const cars=new mongoose.Schema({
    model:{
        required:true,
        type:String
    },
    url:{
        required:true,
        type:String,
    },
    name:{
        required:true,
        type:String,
    },
    year:{
        required:true,
        type:Number
    }
},
{
    timestamps: false,
    versionKey: false
});



module.exports = mongoose.model('Cars', cars)