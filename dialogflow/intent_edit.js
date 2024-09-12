const {Payload} = require('dialogflow-fulfillment');
const Custom = require("../custom");
const Order  = require("../model/order");
const OrderRep  = require("../repository/order_repository");
const ProductRep  = require("../repository/product_repository");
const UserRep  = require("../repository/user_repository");

const escpos = require('escpos');
escpos.Network = require('escpos-network');
 
const device  = new escpos.Network('192.168.0.210');

async function print(order,products){
        console.log(order)

        const options = { encoding: "windows-874" /* default */ }
        // encoding is optional

        const printer = new escpos.Printer(device, options);
         
        device.open(function(error){
        printer
        .size(1, 1)
        .text('แก้ไขรายการ')
        .text(`${order.company}  ${order.date}`  )
        .barcode('1234567', 'EAN8')
        .table(["One", "Two", "Three"])
        .tableCustom(
            [
            { text:"Left", align:"LEFT", width:0.33, style: 'B' },
            { text:"Center", align:"CENTER", width:0.33},
            { text:"Right", align:"RIGHT", width:0.33 }
            ],
            { encoding: 'cp857', size: [1, 1] } // Optional
        )
        .qrimage('https://github.com/song940/node-escpos', function(err){
            this.cut();
            this.close();
        });
        });
        }

  
  async function intentEdit(agent) {
      
      
      const lineId = Custom.getLineID(agent);
      const company = agent.parameters.company;
      const date = agent.parameters.date;
  
     
      const uret = await UserRep.findByLineId(lineId);
      const ret2 = await OrderRep.findAll();
     
    
     const orderId = '';
      if (uret.success) {
        const userId = uret.data;
              
        const  retOrder = await OrderRep.insert({company:company,date:date,user:userId});
        const orderId = retOrder.data._id;
     
        const msgs = agent.query.split('\n');
        const parms = [];
        msgs.map((msg,index) => {
            if( index  > 0) {

                parms.push({index:index,name: msg, order: orderId },)
               
            } 

            
        })
        console.log(parms)
        await ProductRep.insert(parms);
        //await print(retOrder.data,parms);
        agent.add(`บันทึกการแก้ไขเรียบร้อยแล้ว `);

      } else {
       
        
       
        agent.add(` ${name} คุณยังไม่อยู่ในระบบกรุณาลงทะเบียน`);
      }
  
     
      
        
      
  }
  
  
  module.exports = { intentEdit };
  