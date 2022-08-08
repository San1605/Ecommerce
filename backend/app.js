const express =require("express")

const app=express();
const cookieParser=require("cookie-parser")
const errorMiddleware=require('./middleware/error')
app.use(express.json());


app.use(cookieParser())



const product=require("./routes/Productroutes")
const user=require("./routes/userRoute")


app.use("/api/v1",product)
app.use("/api/v1",user)
app.use(errorMiddleware)

//middleware for error


module.exports=app