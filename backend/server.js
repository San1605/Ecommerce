const app =require("./app")
const dotenv=require("dotenv")

const connectDB=require('./config/db');


// handling  uncaught exception

process.on("uncaughtException",(err)=>{
    console.log(`${err.message}`);
    console.log("shutting down the server due to uncaught exception ");
    process.exit(1)
})


dotenv.config({path:"backend/config/config.env"})

connectDB();
const server=app.listen(process.env.PORT,()=>{
console.log("server is running");
})


//  console.log(youtube)   // uncaught error




//unhandled promise rejections  
//coneection url m defect hoto

process.on("unhandledRejection",err=>{
    console.log(`${err.message}`);
    console.log("shutting down the server due to unhandled promise rejection ");
    server.close(()=>{
        process.exit(1)
    })
})