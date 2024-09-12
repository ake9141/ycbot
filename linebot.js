require('dotenv').config();
const line = require('@line/bot-sdk');



const config = {
    channelAccessToken: process.env.token,
    channelSecret: process.env.secretcode
   
}

const client = new line.Client(config);



async function lineHandleEvents(event) {
    console.log(event);


    if (event.type == 'message') {
      console.log(event.message.text)

   
    
        return client.replyMessage(event.replyToken, [
          {
              "type": "text",
              "text": `HI YOUUU`,
          }
      ]);

      
    }

    
    if (event.type === 'postback') {

        if (event.postback.data == 'M') {
            return client.replyMessage(event.replyToken, [
                {
                    "type": "text",
                    "text": `Choose Man`,
                }
            ]);
        } else {
            return client.replyMessage(event.replyToken, [
                {
                    "type": "text",
                    "text": `Choose Woman`,
                }
            ]);

        }


    } else {

        if (event.message.type == 'image') {

            if (event.message.contentProvider.type === 'line') {
                const dlpath = path.join(__dirname, 'download', `${event.message.id}.jpg`)

                await downloadcontent(event.message.id, dlpath);

                const imagePath = `download/${event.message.id}.jpg`;
                Tesseract.recognize(imagePath, 'tha+eng')
                    .then( ( { data: { text }}) => {
                        //console.log(text);
                        //let thai = text.match(/[ก-๛a-zA-Z ]+/g);
                        let number = text.match(/[0-9]+/g)
                        //console.log(number);

                        return client.replyMessage(event.replyToken, [
                            {
                                "type": "text",
                                "text": `${number}`
                            }
                        ])
                    })
                

                

            }

        } else {

            return client.replyMessage(event.replyToken, [
                {
                    "type": "imagemap",
                    "baseUrl": "https://2323-2403-6200-88a0-a6c6-30af-e42d-eacb-4d5e.ngrok-free.app/476521096787526059.jpg?version=",
                    "altText": "ข้อความที่ต้องการให้แสดงหน้า LINE",
                    "baseSize": {
                      "width": 1040,
                      "height": 1040
                    },
                    "actions": [
                      {
                        "type": "message",
                        "area": {
                          "x": 0,
                          "y": 0,
                          "width": 469,
                          "height": 434
                        },
                        "text": "Click SCB"
                      },
                      {
                        "type": "message",
                        "area": {
                          "x": 494,
                          "y": 0,
                          "width": 546,
                          "height": 453
                        },
                        "text": "Click cardX"
                      },
                      {
                        "type": "message",
                        "area": {
                          "x": 3,
                          "y": 457,
                          "width": 1037,
                          "height": 288
                        },
                        "text": "คลิกตรงกลาง"
                      },
                      {
                        "type": "uri",
                        "area": {
                          "x": 0,
                          "y": 760,
                          "width": 1040,
                          "height": 280
                        },
                        "linkUri": "https://www.google.com"
                      }
                    ]
                  }
            ])
        }
    }
    

    
}

function lineConfig(){
    return line.middleware(config)
}

module.exports = { lineHandleEvents,lineConfig };
