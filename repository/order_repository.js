const Order  = require("../model/order")
const User  = require("../model/user")


const lpage = process.env.page;

const orderRepository = {
    // Find all users\
   
    async findAll(filter) {

      try {
            const query = {};
            const page = filter.page ?? 1;
            const limit = filter.limit ?? lpage;
            if (filter.text) { // Example field for "like" search
              query.text = { $regex: new RegExp(filter.text, 'i') }; // 'i' for case-insensitive
            }

            if (filter.name) { 
              const uquery = {};
              uquery.name =    { $regex: new RegExp(filter.name, 'i') };
              const user = await User.findOne(uquery);
              console.log(user)
              if (user) {
                query.user = {_id:user._id}
              }
              
            }

            const count = await Order.countDocuments(query);
            
            const values = await Order.find(query).populate("user")
            .skip((page-1) * limit) // Skip the items of previous pages
            .limit(limit)
            .sort({
              orderId: 'desc'})

           return {success:true,data:values,count:count}

            
          
          } catch (err){
            
            return {success:false,error:err};
          }
    },

    async findByUser(userId,filter) {

     
      
    
      try{
         
        const query = {};
        const page = filter.page ?? 1;
        const limit = filter.limit ?? lpage;
        if (filter.text) { // Example field for "like" search
          query.text = { $regex: new RegExp(filter.text, 'i') }; // 'i' for case-insensitive
        }
         console.log(query)
        if(userId) {
         query.user = userId;
        }
      
            
           
            count = await Order.countDocuments(query);
            values =  await Order.find(query).populate("user")
            .skip((page-1) * limit) // Skip the items of previous pages
            .limit(limit)
            .sort({
              orderId: 'desc'})
          

          return  {success:true,data:values,count:count}

        } catch (err){
            
          return {success:false,error:err};
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
          
          return {success:false,error:err.code}
        }
        
    },
  
    // Update a user
    async update(id, updatedData) {
      try{
       
        
        const options = { new: true };

        const order = await Order.findByIdAndUpdate(
            id, updatedData, options
        )
     
        console.log(order)
        return {success:true,data:order}

      } catch (err){
        console.log(err)
        return {success:false,error:err}
      }
    },
  
   
  };
  
  module.exports = orderRepository;