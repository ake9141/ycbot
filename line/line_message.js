const OrderRep  = require("../repository/order_repository");
const UserRep  = require("../repository/user_repository");
const escpos = require('escpos');
escpos.Network = require('escpos-network');
const device  = new escpos.Network('192.168.0.210');
const {format} = require('date-fns');

async function print(order){
    console.log(order)
    
    const cdate  = format(order.createdAt,'dd/MM/yyyy hh:mm');

    const options = { encoding: "windows-874" /* default */ };
    // encoding is optional

    const printer = new escpos.Printer(device,options);
    var title = ''
    if (order.orderType = 'edit') {
        title = 'แก้ไข'
    } else if (order.orderType = 'order') {
        title = 'ขึ้นสินค้า'
    }

     
    device.open(function(error){
    printer
    .align('ct')
    .style('b')
    .text(`${title}รายการโดย ${order.user.name}  ${cdate}  `)
    .newLine(1)
    .align('lt')
    .text(`${order.text}`  )
    .newLine(1)
    .newLine(1)
    .cut()
    .close()
   
   
    
    });
}


async function lineMessage(userId,event,client) {

    const text = event.message.text;
    const twoChar = text.trimEnd().slice(-2);


    if (twoChar == 'ปล') {
        const  ret = await OrderRep.insert({text:text,user:userId,orderType:'edit'});

        if (ret.success) {

            await print(ret.data)

            return client.replyMessage(event.replyToken, [
                {
                    "type": "text",
                    "text": `บันทึกเรียบร้อย`,
                }]);
        }

    } else if (twoChar == 'สง'){

        const  ret = await OrderRep.insert({text:text,user:userId,orderType:'order'});
        return client.replyMessage(event.replyToken, [
            {
                "type": "text",
                "text": `บันทึกเรียบร้อย`,
            }]);

    }
      
    
}


module.exports = { lineMessage };
