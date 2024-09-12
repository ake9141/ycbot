const Order  = require("../model/order")



const orderRepository = {
    // Find all users
    async findAll() {
      return await Order.find().populate("user");
    },
  
    // Find user by ID
    async findById(id) {
      return await Order.findOne({ _id: id });
    },
  
    // Insert a new user
    async insert(data) {

        try{
          const order= new Order(data);
          await order.save();
          data = await Order.findOne({ _id: order._id }).populate("user");
          return {success:true,data:data}

        } catch (err){
          
          return {success:false,data:err.code}
        }
        
    },
  
    // Update a user
    async update(id, parm) {
      try{
        const result = await Order.findByIdAndUpdate(id,parm,{ new: true });
        return {success:true,data:result}
      } catch (err){
        return {success:false,data:err.code}
      }
    },
  
    // Delete a user
    async delete(id) {
      const result = await User.deleteOne({ _id: id});
      return result.deletedCount > 0;
    }
  };
  
  module.exports = orderRepository;