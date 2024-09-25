const express = require("express")
const router= express.Router();
const orderRepository  = require("../repository/order_repository")
const {setRes} = require("../custom");




router.get("/order/:npage",async (req,res)=>{
    const npage = req.params.npage;
    const filter = req.query; 
    
    let data = await orderRepository.findAll(npage,filter);
    setRes(res,data);
})


router.get("/order/:npage/:id",async (req,res)=>{
    const id = req.params.id;
    const npage = req.params.npage;
    let data = await orderRepository.findByUser(npage,id);
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