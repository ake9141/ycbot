const express = require("express")
const router= express.Router();
const orderRepository  = require("../repository/order_repository")
const {setRes} = require("../custom");

 


router.get("/order",async (req,res)=>{
   
    const filter = req.query; 
    
    let data = await orderRepository.findAll(filter);
    setRes(res,data);
})


router.get("/orderuser/:id",async (req,res)=>{
    const id = req.params.id;
    const filter = req.query; 
    let data = await orderRepository.findByUser(id,filter);
    setRes(res,data);
})



router.patch('/order/:id', async (req, res) => {
        const id = req.params.id;
        console.log(req.body);
        const updatedData = req.body;
        let data =  await orderRepository.update(id,updatedData)
       
        setRes(res,data);
});



module.exports = router;