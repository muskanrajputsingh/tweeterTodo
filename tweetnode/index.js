const express=require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
require('./db/conn');
require("dotenv").config()
const tweetRoute=require('./Route/tweetRouter');
const profileRoute=require('./Route/profileRoute');
const registerRoute=require('./Route/registerRoute');

const app=express()
app.use(bodyParser.json({ limit: '10mb' })); 


const PORT=process.env.port || 14000 

app.use(cors());
app.use(express.json())
app.use("/api",tweetRoute);
app.use("/api",profileRoute);
app.use("/api",registerRoute);

app.listen(PORT,()=>{
    console.log(`server starts at port ${PORT}`)
})