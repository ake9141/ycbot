const mongoose =require("mongoose");
const  mongooseSequence = require("mongoose-sequence");
const Schema = mongoose.Schema;
const schema = new Schema({
    index:Number,
    name:String,
    order:{type: Schema.Types.ObjectId,ref: 'orders'},
    
},{
    timestamps: true,
})
schema.plugin(mongooseSequence(mongoose),{inc_field:'productId'})
const model= mongoose.model("products",schema);
module.exports = model;