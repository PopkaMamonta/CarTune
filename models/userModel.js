const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");

const users=new mongoose.Schema({
    email:{
        required:true,
        type:String,
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    username:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        type: String,
        required: true
    }
},
{
    timestamps: false,
    versionKey: false
});

users.methods.toUserResponse = async function() {
    return {
        username: this.username,
        email: this.email,
    }
};

users.methods.generateAccessToken = function() {
    const accessToken = jwt.sign({
            "user": {
                "id": this._id,
                "email": this.email,
                "password": this.password
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d"}
    );
    return accessToken;
}

users.methods.toUserResponseAuth = async function() {
        const token=this.generateAccessToken()
        return {

            username: this.username,
            email: this.email,
            password:this.password,
            token: token
        }
    }

module.exports = mongoose.model('Users', users)