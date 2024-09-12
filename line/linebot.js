require('dotenv').config();
const line = require('@line/bot-sdk');
const {lineMessage } = require('./line_message')
const UserRep  = require("../repository/user_repository");




const config = {
    channelAccessToken: process.env.token,
    channelSecret: process.env.secretcode
   
}

const client = new line.Client(config);



async function lineHandleEvents(event) {
  
    const lineId = event.source.userId;
    const uret = await UserRep.findByLineId(lineId);

   

    const userId = uret.data;

    if (event.type == 'message') {
       
        const text = event.message.text;
        const twoChar = text.trimEnd().slice(-2);

        if (twoChar == 'ทบ') {

            const utexts = text.split(' ');

            const uname  = utexts[0];

            const  ret = await   UserRep.insert({lineId:lineId,name:uname})

            return client.replyMessage(event.replyToken, [
                    {
                        "type": "text",
                        "text": `ลงทะเบียนเรียบร้อย`,
            }]);

        } else {
          

            if (!uret.success) {

                return client.replyMessage(event.replyToken, [
                    {
                        "type": "text",
                        "text": `กรุณาลงทะเบียนก่อน`,
                    }]);
        
            }  else {
                
                console.log('pass')
                lineMessage(userId,event,client)
            }
        }
    }

    

    
}

function lineConfig(){
    return line.middleware(config)
}

module.exports = { lineHandleEvents,lineConfig };
