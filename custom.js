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


    replyflex:function(client,event,title,url)
    { 
        return client.replyMessage(event.replyToken, [
            {
                "type": "flex",
                "altText": "This is a Flex message",
                "contents": {
                  "type": "bubble",
                  "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": title,
                        "weight": "bold",
                        "size": "xl"
                      },
                      {
                        "type": "text",
                        "text": "กดปุ่มเพื่อเปิดโปรแกรม"
                      }
                    ]
                  },
                  "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "button",
                        "style": "primary",
                        "action": {
                          "type": "uri",
                          "label": "เปิดโปรแกรม",
                          "uri": url
                        }
                      }
                    ]
                  }
                }
              }
    ]);

    },


    setRes:function(res,data){
        if (data.success == true){
            return  res.status(200).json(data);
        } else {
            res.status(500).json(data);
        }
    }
}


