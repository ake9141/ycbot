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

           
        if (uret.success == false) {
            return client.replyMessage(event.replyToken, [
                {
                    "type": "text",
                    "text": `error ติดต่อ admin`,
                }]);

        } else {



            if (uret.data === null) {
                
                if(twoChar == 'ทบ'){
                    lineRegister(lineId,event,client)
               
                } else {
                    return client.replyMessage(event.replyToken, [
                        {
                            "type": "text",
                            "text": `กรุณาลงทะเบียนก่อน`,
                        }]);

                }
          
                
    
            }  else  {
                    

                    const user = uret.data;
                
                    if (!user.isConfirm){

                        return client.replyMessage(event.replyToken, [
                            {
                                "type": "text",
                                "text": `คุณ ${user.name} รอการยืนยันจาก admin`,
                            }]);

                    } else {
                        if (user.isCancel){
                            return client.replyMessage(event.replyToken, [
                                {
                                    "type": "text",
                                    "text": `คุณ ${user.name} ไม่มีในระบบ`,
                                }]);
                        } else { 
                          lineMessage(user,event,client)
                        }
                    }
            } 

        }


    }

    

    
}

function lineConfig(){
    return line.middleware(config)
}

module.exports = { lineHandleEvents,lineConfig };
