const express = require("express")
const router= express.Router();
const userRepository  = require("../repository/user_repository")



router.get("/user",async (req,res)=>{
    let data = await userRepository.findAll()
    
    console.log(data);
    res.status(200).json(data);
})


router.get("/user/:id",async (req,res)=>{
    const id = req.params.id;
    let data = await userRepository.findByLineId(id)
    
    console.log(data);
    res.status(200).json(data);
})

router.patch('/user/:id', async (req, res) => {
        const id = req.params.id;
        console.log(req.body);
        const updatedData = req.body;
        let data =  await userRepository.update(id,updatedData)
       
        res.status(200).json(data);
});



module.exports = router;