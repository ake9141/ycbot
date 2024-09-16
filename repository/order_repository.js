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
       
        
        const options = { new: true };

        const order = await Order.findByIdAndUpdate(
            id, updatedData, options
        )
     
        console.log(order)
        return {success:true,data:order}

      } catch (err){
        
        return {success:false,data:err}
      }
    },
  
   
  };
  
  module.exports = orderRepository;