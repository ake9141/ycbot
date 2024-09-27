const express = require("express")
const router= express.Router();
const userRepository  = require("../repository/user_repository")
const {setRes} = require("../custom");


router.get("/user",async (req,res)=>{
   
    const filter = req.query; 
    let data = await userRepository.findAll(filter)
    
    setRes(res,data);
   
})


router.get("/user/:id",async (req,res)=>{
    const id = req.params.id;
    let data = await userRepository.findByLineId(id)
    setRes(res,data);
})

router.patch('/user/:id', async (req, res) => {
        const id = req.params.id;
        console.log(req.body);
        const updatedData = req.body;
        let data =  await userRepository.update(id,updatedData)
       
        res.status(200).json(data);
});



module.exports = router;