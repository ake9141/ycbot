const User  = require("../model/user")
const lpage = process.env.page;


const userRepository = {
    // Find all users
    async findAll(filter) {
      try {
        const query = {};
        const page = filter.page ?? 1;
        const limit = filter.limit ?? lpage;
       
       
        if (filter.name) { // Example field for "like" search
          query.name = { $regex: new RegExp(filter.name, 'i') }; // 'i' for case-insensitive
        }
        const count = await User.countDocuments(query);

        const values =  await User.find(query)  
        .skip((page-1) * limit) // Skip the items of previous pages
        .limit(limit)
      
       
        return  {success:true,data:values,count:count}
      } catch (err){
              
        return  {success:false,error:err};
      }
    },
  
    // Find user by ID
    async findByLineId(lineId) {
      try {
       
        const value = await User.findOne({ lineId: lineId });
        if (!item) {
          return {success:true,data:null};
        } else {
             return {success:true,data:value};
          }
      } catch (err){
            
        return  {success:false,error:err};
      }
    },
  
    // Insert a new user
    async insert(parm) {
   
      try{
        const  user = new User(parm);
        await user.save();
        return {success:true,data:user}

      } catch (err){
        
        return  {success:false,error:err};
      }
    },
  
    // Update a user
    async update(id, updatedData) {
      try{
       
        console.log(updatedData);
        const options = { new: true };

        const user = await User.findByIdAndUpdate(
            id, updatedData, options
        )
     
        return {success:true,data:user}

      } catch (err){
        
        return  {success:false,error:err};
      }
    },
  
    // Delete a user
    async delete(userId) {
      const result = await User.deleteOne({ _id: userId });
      return result.deletedCount > 0;
    }
  };
  
  module.exports = userRepository;