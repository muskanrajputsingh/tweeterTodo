const mongoose = require('mongoose');
// const DB = process.env.DATABASE;
mongoose.connect("mongodb+srv://muskansingh7105:ffKfrsX5rOMhHRij@cluster0.scyj70c.mongodb.net/prac1?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log("database connected")).catch((err)=>{
    console.log("err:",err)
})

