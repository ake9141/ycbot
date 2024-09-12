const mongoose = require("mongoose");


const uri = "mongodb+srv://ake9141:Ying1968@cluster0.o6zvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


async function connectDB(){
     await mongoose.connect(uri,{
        autoIndex: true,
        dbName:"npdb",
    })
    console.log("db connected")
}

module.exports = {connectDB};