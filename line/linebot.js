require('dotenv').config();
const line = require('@line/bot-sdk');
const {lineMessage, lineRegister } = require('./line_message')
const UserRep  = require("../repository/user_repository");





const config = {
    channelAccessToken: process.env.token,
    channelSecret: process.env.secretcode
   
}

const client = new line.Client(config);



async function lineHandleEvents(event) {
  
    const lineId = event.source.userId;
    const uret = await UserRep.findByLineId(lineId);

   
   


    if (event.type == 'message') {
       
        const text = event.message.text;
        const twoChar = text.trimEnd().slice(-2);

         console.log(event.source)
          

            if (uret.success == false) {
                
                    if(twoChar == 'ทบ'){
                        lineRegister(event,client)
                   
                    } else {
                        return client.replyMessage(event.replyToken, [
                            {
                                "type": "text",
                                "text": `กรุณาลงทะเบียนก่อน`,
                            }]);

                    }
              
                    
        
            }  else if  (uret.success && user.data) {
                

                const user = uret.data;
               
                if (!user.isConfirm ?? false){

                    return client.replyMessage(event.replyToken, [
                        {
                            "type": "text",
                            "text": `คุณ ${user.name} รอการยืนยันจาก admin`,
                        }]);

                } else {
                    console.log('pass')
                    lineMessage(user._id,event,client)
                }
            } 
    }

    

    
}

function lineConfig(){
    return line.middleware(config)
}

module.exports = { lineHandleEvents,lineConfig };
