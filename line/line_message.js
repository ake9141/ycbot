const OrderRep  = require("../repository/order_repository");
const UserRep  = require("../repository/user_repository");
const {reply,getName,replyflex} = require("../custom");



async function lineMessage(user,event,client) {

    const text = event.message.text;
    const twoChar = text.trimEnd().slice(-2);
    const userId = user._id;
    const userName = user.name;

    if (twoChar == 'ปล') {
        const  ret = await OrderRep.insert({text:text,user:userId,orderType:'edit'});

        if (ret.success) {
            return reply(client,event,`บันทึกรายการที่ ${ret.data.orderId} เรียบร้อย ` );

        }

    } else if (twoChar == 'สง'){
 
        const  ret = await OrderRep.insert({text:text,user:userId,orderType:'order'});
        if (ret.success){
            return reply(client,event,`${userName} บันทึกรายการที่ ${ret.data.orderId} เรียบร้อย ` );
        }
    

  
    }   else if (twoChar == 'ดู'){
        
          return replyflex(client,event,`${userName} ดูรายการorder`,'https://liff.line.me/2006371674-yzKrPkEV');
         
    }  else {
        return reply(client,event,`${userName} ต้องการให้ทำอะไรครับ  ` );
    }
      
    
}




async function lineRegister(lineId,event,client) {

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

    } 
    
      
    
}



module.exports = { lineMessage,lineRegister };
