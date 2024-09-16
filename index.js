const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

require('dotenv').config();
const line = require('@line/bot-sdk');
const {lineHandleEvents, lineConfig} = require('./linebot');
const {connectDB} = require('./model/database');

const userRoutes = require("./routes/user")
const orderRoutes = require("./routes/order")
const lineRoutes = require("./routes/line")

connectDB().catch((err)=>{
  console.error(err)
})







app.use(cors());

app.use("/webhook",lineRoutes)
app.use(bodyParser.json());

//app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send('ok');
})

app.use("/api",userRoutes);
app.use("/api",orderRoutes);


app.listen(port,()=>{
    console.log("server pass",port)
})