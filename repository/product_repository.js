const Product  = require("../model/product")



const productRepository = {
    // Find all users
    async findAll() {
      return await Product.find();
    },
  
    // Find user by ID
    async findById(orderId) {
      return await Product.findOne({ orderId: orderId});
    },
  
    // Insert a new user
    async insert(parms) {
      try{
        const options = { ordered: true };
    // Execute insert operation
        const result = await Product.insertMany(parms, options);
   
        return {success:true,data:result}

      } catch (err){
        console.log(err)
        
        return {success:false,data:err.code}
      }
     
    },
  
   
  
  
  };
  
  module.exports = productRepository;