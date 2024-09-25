const Order  = require("../model/order")
const User  = require("../model/user")


const lpage = process.env.page;

const orderRepository = {
    // Find all users\
   
    async findAll(npage,filter) {

      try {
            const query = {};
            if (filter.text) { // Example field for "like" search
              query.text = { $regex: new RegExp(filter.name, 'i') }; // 'i' for case-insensitive
            }

            const count = await Order.countDocuments(query);

            const items = await Order.find(query).populate("user")
            .skip((npage-1) * lpage) // Skip the items of previous pages
            .limit(lpage)
            .sort({
              orderId: 'desc'})

           return {success:true,data:{count,values}}

            
          
          } catch (err){
            
            return {success:false,data:err.code};
          }
    },

    async findByUser(npage,lineId,filter) {



    
      try{
          const user = await User.findOne({ lineId: lineId });
          let count = 0;
          let values = [];
          if (user){
          
           
            if (filter.text) { // Example field for "like" search
              filter.text = { $regex: new RegExp(filter.text, 'i') }; // 'i' for case-insensitive
            }

            query = {
              ...filter, // Spread existing filter parameters
              ...(user ? { user: user._id } : {}) // Conditionally add user filter
             };
      

            count = await Order.countDocuments(query);
            values =  await Order.find(query).populate("user")
            .skip((npage - 1) * lpage) // Skip the items of previous pages
            .limit(lpage)
            .sort({
              orderId: 'desc'})
          } 

          return {success:true,data:{count,values}}

        } catch (err){
            
          return {success:false,data:err.code};
        }

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