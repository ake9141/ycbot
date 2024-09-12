const mongoose = require("mongoose");

async function connectDB(){
    await mongoose.connect("mongodb://localhost:27017",{
        dbName:"npdb",
    })
    console.log("db connected")
}

module.exports = {connectDB};