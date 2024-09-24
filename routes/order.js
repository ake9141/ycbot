const express = require("express")
const router= express.Router();
const orderRepository  = require("../repository/order_repository")





router.get("/order/:npage",async (req,res)=>{
    const npage = req.params.npage;
    let data = await orderRepository.findAll(npage);
   
    
    console.log(data);
    res.status(200).json(data);
})


router.get("/order/:npage/:id",async (req,res)=>{
    const id = req.params.id;
    const npage = req.params.npage;
    let data = await orderRepository.findByUser(npage,id);
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