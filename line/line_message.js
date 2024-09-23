const OrderRep  = require("../repository/order_repository");
const UserRep  = require("../repository/user_repository");
const {reply,getName} = require("../custom");



async function lineMessage(userId,event,client) {

    const text = event.message.text;
    const twoChar = text.trimEnd().slice(-2);

    if (twoChar == 'ทบ') {

            

        const uname  = getName(text);
        if (uname) {

                const  ret = await   UserRep.insert({lineId:lineId,name:uname,isConfirm:false,isCancel:false,isAdmin:false})

                return client.replyMessage(event.replyToken, [
                        {
                            "type": "text",
                            "text": `คุณ ${uname} ลงทะเบียนเรียบร้อย`,
                }]);

        } else {
            return reply(client,event,"กรุณาลงทะเบียน xxxxx ทบ");

        }

    } else  if (twoChar == 'ปล') {
        const  ret = await OrderRep.insert({text:text,user:userId,orderType:'edit'});

        if (ret.success) {
            return reply(client,event,`บันทึกรายการที่ ${ret.data.orderId} เรียบร้อย ` );

        }

    } else if (twoChar == 'สง'){
 
        const  ret = await OrderRep.insert({text:text,user:userId,orderType:'order'});
        if (ret.success){
            return reply(client,event,`บันทึกรายการที่ ${ret.data.orderId} เรียบร้อย ` );
        }
    

  
    }   else if (twoChar == 'ดู'){
        
          return reply(client,event,'https://liff.line.me/2006371674-yzKrPkEV')

    }
      
    
}


module.exports = { lineMessage };
