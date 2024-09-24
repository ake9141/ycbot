const Order  = require("../model/order")
const User  = require("../model/user")


const lpage = process.env.page;

const orderRepository = {
    // Find all users\
   
    async findAll(npage) {
      console.log(npage);
      return await Order.find().populate("user")
      .skip((npage) * lpage) // Skip the items of previous pages
      .limit(lpage);
    },

    async findByUser(npage,lineId) {
      const user = await User.findOne({ lineId: lineId });
      console.log(user)
      return await Order.find({ user: user._id}).populate("user")
      .skip((npage - 1) * lpage) // Skip the items of previous pages
      .limit(lpage);
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