const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/test');
const connectDB=async()=>{
    try
    {
    await mongoose.connect(`${process.env.MONGO_DB_URI}`)
    console.log("Database connected");
    }
    catch(error)
    {
        console.log(error)
    }
}
module.exports=connectDB