const User  = require("../model/user")
const lpage = process.env.page;


const userRepository = {
    // Find all users
    async findAll(npage,filter) {
      try { 
        const query = {};
        if (filter.name) { // Example field for "like" search
          query.name = { $regex: new RegExp(filter.name, 'i') }; // 'i' for case-insensitive
         }
        const count = await User.countDocuments(query);

        const items =  await User.find(query)  
        .skip((npage-1) * lpage) // Skip the items of previous pages
        .limit(lpage)
      
       
        return {success:true,data:{count,items}};
      } catch (err){
              
        return {success:false,data:err};
      }
    },
  
    // Find user by ID
    async findByLineId(lineId) {
      try {
       
        const item = await User.findOne({ lineId: lineId });
        if (!item) {
          return {success:true,data:null};
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