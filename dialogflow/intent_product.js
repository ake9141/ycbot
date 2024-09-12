const {Payload} = require('dialogflow-fulfillment');
const Custom = require("../custom");
const Order  = require("../model/order");
const OrderRep  = require("../repository/order_repository");


async function intentProduct(agent) {
  const msgs = agent.query.split('\n');
  var isCom = false;
  var isDate = false;

  var company = '';
  var date = '';
  var items = [];
  msgs.map((msg,index) => {
    if( index == 1) {
       isCom = msg.includes('ลูกค้า')
       if (isCom) {
          company = msg.replace('ลูกค้า','');
       }
    } 

    if( index == 2) {
       isDate = msg.includes('วันที่')
       if (isDate){
        date = msg.replace('วันที่','');
       }
       
    } 

    if (index == 3) {
     
      items.push(msg)
      
    }

    

  });


  if (!isCom  ||  !isDate ) {
    agent.add('ยังไม่ระบุ ลูกค้า หรือวันที่ส่ง');
  }
  else if (items.length == 0) {
    agent.add('ยังไม่ระบุสินค้าที่ส่ง');
  } else {
    console.log({'company':company,'date':date,items:items  })


    var itemMsg = [];
    items.map((msg,index) => {

      itemMsg.push({
        "type": "text",
        "text": `${index+1} ${msg}`,
      
     
      },)

    })
    

    const  ret = await OrderRep.insert({company:company,date:date});
    
    if (ret.success) {
        
        const flexMessage = {
          "type": "flex",
          "altText": "Flex Message",
          "contents": {
            "type": "bubble",
            "direction": "ltr",
          
          
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": `${company}  ${date}`  ,
                    "size": "sm",
                    "align": "center",
                    "weight": "bold"
                  },
                
                  ...itemMsg
                ]
              }
            }
      };

      let payload = new Payload(`LINE`, flexMessage, { sendAsMessage: true });
      agent.add(payload);

    } else {
      agent.add(`ข้อมูลมีปัญหาติดต่อadmin ${ret.data} `)
    }



   

    
   // agent.add(new BasicCard({title:`รายการขึ้นของ ${company}`,
                      //  text:`วันที่ ${date}`}));
    
  }
}


module.exports = { intentProduct };