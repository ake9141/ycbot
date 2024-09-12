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
        const result = await User.findOne({ lineId: lineId });
        
        
        return {success:true,data:result._id};
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
    async update(userId, updateFields) {
      const collection = await getUserCollection();
      const result = await User.updateOne(
        { _id: userId },
        { $set: updateFields }
      );
      return result.modifiedCount > 0;
    },
  
    // Delete a user
    async delete(userId) {
      const result = await User.deleteOne({ _id: userId });
      return result.deletedCount > 0;
    }
  };
  
  module.exports = userRepository;