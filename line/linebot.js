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

    if (!uret.success) {

        return client.replyMessage(event.replyToken, [
            {
                "type": "text",
                "text": `กรุณาลงทะเบียนก่อน`,
            }]);

    } 

    const userId = uret.data;

    if (event.type == 'message') {
        console.log('pass')
        lineMessage(userId,event,client)
    }

    

    
}

function lineConfig(){
    return line.middleware(config)
}

module.exports = { lineHandleEvents,lineConfig };
