const User=require("../models/userModel");
const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');

const regUser=asyncHandler(async (req,res)=>{
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;

    if(!email || !username || ! password){
        return res.status(400).json({message:"Все поля должны быть заполнены!"});
    }
    const hashedPass=await bcrypt.hash(password,10);
    const userObject={
        "email":email,
        "username":username,
        "password":hashedPass,
    };

    const createdUser= await User.create(userObject);

    if(createdUser){
        res.status(201).json({
            user:await createdUser.toUserResponse()
        })
    }else{
        res.status(422).json({
            errors:{
                body:"Ошибка при создании пользователя"
            }
        });
    }
});

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid password" });
//         }

//         res.redirect('/');
//     } catch (error) {
//         console.error("Error logging in:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
const loginUser=asyncHandler(async(req,res)=>{
    console.log('Handling login request...');
    const email=req.body.email
    const password=req.body.password
    
    if(!email || !password){
        return res.status(400).json({message:"Все поля должны быть заполнены!"})
    }

    const loginUser=await User.findOne({email}).exec();
    console.log('User found:', loginUser);

    if(!loginUser){
        return res.status(404).json({message:"Пользователь не найден!"})
    }

    const match =await bcrypt.compare(password,loginUser.password);

    if(!match){
        return res.status(401).json({message:"Ошибка авторизации: Неправильный пароль"})
    }
    
    const token = await loginUser.generateAccessToken();

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