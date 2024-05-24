const User=require("../models/userModel");
const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');


const exit=asyncHandler(async(req,res)=>{
    res.status(200).json({
        user:await loginUser.toUserResponseAuth()
    });
})

const currentUser=asyncHandler(async(req,res)=>{
    const email = req.userEmail;
    const user = await User.findOne({ email }).exec();
    if(!user){
        return res.status(400).json({
            message:"Пользователь не найден!"
        });
    }
    return res.status(200).json({
        user:await user.toUserResponseAuth()
    });
});

module.exports={
    regUser,
    loginUser,
    currentUser
}