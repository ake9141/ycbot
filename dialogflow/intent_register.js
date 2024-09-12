const {
  Payload,
  WebhookClient
} = require('dialogflow-fulfillment');
const User  = require("../model/user");
const UserRep  = require("../repository/user_repository");
const Custom = require("../custom");



async function intentRegister(agent) {
    const msgs = agent.query.split(' ');
    var name = "";
    
    const lineId = Custom.getLineID(agent);
    
    msgs.map((msg,index) => {
      if( index == 1) {
         name = msg;
        
      } 
    });

  
    if (name.length == 0) {
      agent.add('ยังไม่ระบุชื่อ');
    } else {

    

    const ret = await UserRep.findByLineId(lineId);
    console.log(ret)
   
    if (ret.success) {
      const username = ret.data.name;
      agent.add(`สวัสดี ${username} คุณอยู่ในระบบแล้ว `);
    } else {
     
      
      await UserRep.insert({lineId:lineId,name:name})
      agent.add(` ${name} ลงทะเบียนเรียบร้อยแล้ว`);
    }

    /*
     
      let user = new User({
        name:name,
        userId:userId
    });
    user.save();*/

    
      
    }
}


module.exports = { intentRegister };
