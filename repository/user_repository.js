const User  = require("../model/user")



const userRepository = {
    // Find all users
    async findAll() {
      return await User.find();
    },
  
    // Find user by ID
    async findByLineId(lineId) {
      try {
        console.log(lineId)
        const user = await User.findOne({ lineId: lineId });
        if (!user) {
          return {success:false,data:user};
        } else {
             return {success:true,data:user};
          }
      } catch (err){
            
        return {success:false,data:err.code};
      }
    },
  
    // Insert a new user
    async insert(parm) {
   
      try{
        const  user = new User(parm);
        await user.save();
        return {success:true,data:user}

      } catch (err){
        
        return {success:false,data:err.code}
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
        
        return {success:false,data:err}
      }
    },
  
    // Delete a user
    async delete(userId) {
      const result = await User.deleteOne({ _id: userId });
      return result.deletedCount > 0;
    }
  };
  
  module.exports = userRepository;