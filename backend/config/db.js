const mongoose=require("mongoose");
const connectDB=()=>{


mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})
.then((data)=>{
console.log(data.connection.host);
})
// }).catch((err)=>{
//     console.log(err);
// })
}

module.exports=connectDB