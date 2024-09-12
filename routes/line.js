const express = require("express")
const router= express.Router();
const line = require('../line/linebot');

router.post('',line.lineConfig(), (req, res) => {
    console.log('pass')
    Promise
    .all([
        req.body.events.map(line.lineHandleEvents)
    ])
    .then((result) => res.json(result))
});






//const { intent} = require('../dialogflow/dialogflow');


/*
router.post("",(req,res)=>{
  
    //res.send('ok');
    intent(req,res);
})*/

module.exports = router;


