const {
    Payload,
    WebhookClient
  } = require('dialogflow-fulfillment');
const User  = require("./model/user")

const { intentProduct } = require("./dialogflow/intent_product");

 async function intentRegister(agent) {
    const msgs = agent.query.split(' ');
    var name = "";
    const userId = agent.originalRequest.payload.data.source.userId;
    console.log(userId)
    msgs.map((msg,index) => {
      if( index == 1) {
         name = msg;
        
      } 
    });
    

      
    if (name.length == 0) {
      agent.add('ยังไม่ระบุชื่อ');
    } else {

      const query = { userId: userId };

    const results = await User.find(query);
    if (results.length > 0) {
      const username = results[0].name;
      agent.add(`สวัสดี ${username} คุณอยู่ในระบบแล้ว `);
    } else {
      agent.add(` ${usernameเบียนเรียบร้อยแล้ว} ลงทะเบียนเรียบร้อยแล้ว`);
    }

    /*
     
      let user = new User({
        name:name,
        userId:userId
    });
    user.save();*/

    
      
    }
}



function intent(req,res) {
    const agent = new WebhookClient({
      request: req,
      response: res
    });

    const userId = req.body.originalDetectIntentRequest.payload.data.source.userId;
   
    console.log(agent);
    console.log('user',userId)
    //Test get value of WebhookClient
    console.log('agentVersion: ' + agent.agentVersion);
    console.log('intent: ' + agent.intent);
    console.log('locale: ' + agent.locale);
    console.log('query: ', agent.query);
    console.log('session: ', agent.session);
  
    //Function Location
   
    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('send product', intentProduct); 
    intentMap.set('register', intentRegister);  // "Location" is once Intent Name of Dialogflow Agent
    agent.handleRequest(intentMap);
}


module.exports = { intent };