const mongoose =require("mongoose");
const  mongooseSequence = require("mongoose-sequence");
const Schema = mongoose.Schema;
const OrderType = [
    "order", 
    "edit", 
   
  ];
const schema = new Schema({
    text:{type:String},
    orderType: { type: String, enum: OrderType },
    isConfirm:{type:Boolean},
    isPrint:{type:Boolean},
    isSend:{type:Boolean},
    user:{type: Schema.Types.ObjectId,ref: 'users'},
    
},{
    timestamps: true,
})
OrderType
schema.plugin(mongooseSequence(mongoose),{inc_field:'orderId'})
const model= mongoose.model("orders",schema);
module.exports = model;