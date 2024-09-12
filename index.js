const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

require('dotenv').config();
const line = require('@line/bot-sdk');
const { intent} = require('./dialogflow2');
const {lineHandleEvents, lineConfig} = require('./linebot');
const {connectDB} = require('./model/database');

const userRoutes = require("./routes/user")
const lineRoutes = require("./routes/line")

connectDB().catch((err)=>{
  console.error(err)
})


//app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.send('ok');
})



const config = {
    //channelAccessToken: process.env.token,
    //channelSecret: process.env.secretcode
    channelAccessToken: 'qXbi7XCVp3wofBgdf762A5Lu7x9tUwGuVqsyKG6n6Cf44yf7R3zwnL9Po/YaBQbpb7UkPfRoLd3+JzhlzH0AzG3H/CSplZHoz2POF8natTb2ynwPutUz6aJnt4V/D50v+NIQ+0CiWlTAgIF8BqvTRAdB04t89/1O/w1cDnyilFU=',
    channelSecret: '04f0c44f8e54927a9f07a0a001e7b38f'
}

/*
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log('pass')
    res.sendStatus(200)
});*/



app.use("/api",userRoutes)
app.use("/webhook",lineRoutes)



app.listen(port,()=>{
    console.log("server pass",port)
})