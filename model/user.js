const mongoose =require("mongoose");
const  mongooseSequence = require("mongoose-sequence");
const Schema = mongoose.Schema;
const schema = new Schema({
    lineId:String,
    name:String,
    isAdmin:Boolean,
    isConfirm:Boolean,
    isCancel:Boolean
    
},{
    timestamps: true,
})
schema.plugin(mongooseSequence(mongoose),{inc_field:'userId'})
const model= mongoose.model("users",schema);
module.exports = model;