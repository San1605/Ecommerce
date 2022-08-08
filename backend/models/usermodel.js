const { type } = require("express/lib/response")
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")


//user schemaa  

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"],
        maxlength: [30, "name should exceed 30 characters"],
        minlength: [4, "name should not be less than 4 characters"]
    },

    email: {
        type:String,
        required:[true,"pleae enter your Email"],
        unique:true,
        validate:[validator.isEmail,"please enter valid email"]
    },
password:{
    type:String,
    required:[true,"please enter your password"],
    minlength:[8,"password should be greater than 8 characters"],
    select:false, //cannot select password
},
avatar:{
    
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    
},
role:{
    type:String,
    default:"user",
},

resetPasswordToken:String,
resetPasswordExpire:Date,

})

// password encryptionn
// pre==userschema s phle krna h
//function keyword use kia h kuki this use ni kr skte arrow function m 

userSchema.pre("save",async function(next){
if(!this.isModified("password")){
    next(); //modify ni hona chiyee
}

    this.password=await bcrypt.hash(this.password,10)
})




//JWT TOKEN   register krte hi logon krna h to yh token store kr lega cookies m 

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,   // kitte dino bad logout krbna h user ko
    })
}


// comapre passwords

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}



module.exports=mongoose.model("User",userSchema)








