const Preset=require("../models/presetModel");
const asyncHandler=require('express-async-handler');


const savePreset=asyncHandler(async (req,res)=>{
    const car=req.body.car;
    const wing=req.body.wing;
    const r=req.body.r;
    const g=req.body.g;
    const b=req.body.b;

    const presetObject={
        "car":car,
        "wing":wing,
        "r":r,
        "g":g,
        "b":b,
    };
    
    const createdPreset= await Preset.create(presetObject);

    if(createdPreset){
        res.status(201).json({
            user: createdPreset
        })
    }else{
        res.status(422).json({
            errors:{
                body:"Ошибка при создании пресета!"
            }
        });
    }
});

module.exports={
    savePreset
}