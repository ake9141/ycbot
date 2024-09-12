const {
    Payload,
    WebhookClient
  } = require('dialogflow-fulfillment');

const {intentProduct}  = require("./intent_product");
const {intentRegister} = require("./intent_register");
const {intentEdit} = require("./intent_edit");
function intent(req,res) {
    const agent = new WebhookClient({
      request: req,
      response: res
    });

    const userId = req.body.originalDetectIntentRequest.payload.data.source.userId;


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
    intentMap.set('edit', intentEdit); 
    agent.handleRequest(intentMap);
}


module.exports = { intent };