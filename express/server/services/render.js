const fs = require('fs');

 
const file="./server/data/data.json";
const fileContents = fs.readFileSync(file,'utf-8');
const data = JSON.parse(fileContents);

exports.homeRoute=(req,res)=>{

    res.render("index",{data:data})
}
exports.add=(req,res)=>{
    res.render("add")
}
exports.update=(req,res)=>{
    const id = req.query.id;
      const   user= data[id-1]; 
    
    res.render('update', {user:user})
}