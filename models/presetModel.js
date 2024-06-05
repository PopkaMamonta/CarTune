const mongoose=require('mongoose');

const presets=new mongoose.Schema({
    car:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"cars",
    },
    wing:{
        required:true,
        type:String,
    },
    r:{
        required:true,
        type:Number
    },
    g:{
        required:true,
        type:Number
    },
    b:{
        required:true,
        type:Number
    }
},
{
    timestamps: false,
    versionKey: false
});



module.exports = mongoose.model('Presets', presets)