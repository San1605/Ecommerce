const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncerror");
const User = require("../models/usermodel");
const sendToken = require("../utils/jwttoken");

//register  a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "thisissample",
            url: "profilepic"
        }
    })

  sendToken(user,200,res)
})




//login a user

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //checking email or password dono h na

    if (!email || !password) {
        return next(new ErrorHandler("please enter email and password", 400))
    }

    const user = await User.findOne({ email }).select("+password") //password ko alag se use kia h select k sath because upar select false h mtlb mongodb pasword ko normally return ni krega 

    if (!user) { //aagr user ni mila 
       return next(new ErrorHandler("invalid email or password",401))
    }

    const isPasswordMatched=await user.comparePassword(password);  //enteres password or databse k passowr dko amtch krna k liye

    if (!isPasswordMatched) { //agar ni match hua passowrd 
        return next(new ErrorHandler("invalid email or password",401))
     }

sendToken(user,200,res);
})




//logout user


exports.logout=catchAsyncErrors(async(req,res,next)=>{
   
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    }) 

    res.status(200).json({
      success:true,
      message:"logout"
    })
})