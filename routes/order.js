const express = require("express")
const router= express.Router();
const orderRepository  = require("../repository/order_repository")



router.get("/order",async (req,res)=>{
    let data = await orderRepository.findAll();
    
    console.log(data);
    res.status(200).json(data);
})

router.patch('/order/:id', async (req, res) => {
        const id = req.params.id;
        console.log(req.body);
        const updatedData = req.body;
        let data =  await orderRepository.update(id,updatedData)
       
        res.status(200).json(data);
});



module.exports = router;