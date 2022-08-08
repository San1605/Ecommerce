const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerror = require("./catchAsyncerror");
const jwt=require("jsonwebtoken");
const User = require("../models/usermodel");
exports.isAuthenticatedUser=catchAsyncerror(async(req,res,next)=>{

    const {token}=req.cookies;
 
     if(!token){
         return next(new ErrorHandler("Please login to access this resource",401))
     }

     const decodeddata=jwt.verify(token,process.env.JWT_SECRET)
    req.user= await User.findById(decodeddata.id)
    next();
    //  console.log(token);
})



exports.authorisedRoles=(...roles)=>{


}