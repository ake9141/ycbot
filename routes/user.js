const express = require("express")
const router= express.Router();
const userRepository  = require("../repository/user_repository")


router.get("/user",async (req,res)=>{
    let data = await userRepository.findAll()
    console.log(data);
    res.status(200).json(data);
})

module.exports = router;