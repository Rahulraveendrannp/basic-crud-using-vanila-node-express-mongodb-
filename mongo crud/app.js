const express = require("express");
const app = express();
const path = require('path');
require("./src/db/config");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nocache = require('nocache');


const port = process.env.PORT || 3000
app.use(express.static(path.join(__dirname+"/src")))
app.use(express.json());
app.use(express.urlencoded({extended:true}))    
app.use(nocache());
app.set('view engine', 'ejs');
app.use(cookieParser());  

app.use(session({
    secret:'key',cookie:{maxAge:6000000},
    resave:true,
    saveUninitialized:true
  }))

app.use('/',require('./server/routes/routes'))




app.listen(port,()=>{
    console.log(`server is running at prt no ${port}`);
})