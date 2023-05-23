const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/mongocrud",{ 
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log('connction successful');
}).catch((err)=>{
    console.log(err);
})