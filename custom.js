module.exports = {
    getLineID:function(agent)
    { 
        return agent.originalRequest.payload.data.source.userId; 

    },
    getName:function(text){

        if (text.includes('\n')) {
            return null;
        } else  {

            const name  = text.replace('ทบ','').trim();
        
            return name;
        }
    },
    reply:function(client,event,text)
    { 
        return client.replyMessage(event.replyToken, [
            {
                "type": "text",
                "text": text
            }]);

    },
}


