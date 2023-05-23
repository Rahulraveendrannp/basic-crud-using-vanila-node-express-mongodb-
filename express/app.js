const express = require('express');
// const path = require('path');
const app=express();
const morgan=require("morgan");
const bodyParser = require('body-parser');
const path=require("path");



const port=process.env.PORT || 3000
//log requests
app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({extended:true}))


// app.set('views',path.join(__dirname,'views'));
app.set("view engine","ejs");




app.use('/',require('./server/routes/router'))


app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})