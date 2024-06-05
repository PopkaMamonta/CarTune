const Car=require("../models/carModel");
const asyncHandler=require('express-async-handler');


const getCars=asyncHandler(async(req,res)=>{
    const data = await Car.find();
    
    if(!data){
        return res.status(400).json({
            message:"Автомобили не найдены!"
        });
    }
    return res.status(200).json({
        car:data
    });
});

module.exports={
    getCars
}