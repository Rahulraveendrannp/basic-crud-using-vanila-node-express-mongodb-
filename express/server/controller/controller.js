const fs = require('fs');

 
 const file="./server/data/data.json";
 const fileContents = fs.readFileSync(file,'utf-8');
 const data = JSON.parse(fileContents);


exports.create=(req,res)=>{
    if(!req.body.name){
        res.status(400).send({message:"content cannot be empty!"});
        return;
    }


    const user={
        id : data.length+1,
        Name:req.body.name,
        Department:req.body.department,
        Phone:req.body.phone
    }

    data.push(user);
      fs.writeFileSync(file,JSON.stringify(data));
       res.redirect('/add');

}

// exports.find=(req,res)=>{
//     if(data){
//         console.log("sjhdkj");
//         res.send(data);
//   }else{
//         res.status(500).send({message:error.message || "User Data not found"});
//   }
// }

// exports.findById=(req,res)=>{
//     const userId = req.params.id;
//     const user = data.find((item)=> item.id === parseInt(userId));
   
//     if(user){
//           res.send(user);
//     } else{
//           res.status(500).send({message: "User Data not found"});
//     }
// }

exports.update=(req,res)=>{
    console.log("reached");
    const userId = req.params.id;
    const index = data.findIndex((obj => obj.id == userId))
    if(index !== -1){
        data[index] = {
            id : userId,
            Name:req.body.name,
            Department:req.body.department,
            Phone:req.body.phone
        }
        fs.writeFileSync(file,JSON.stringify(data));
        res.status(200).send('<script>alert(Updated Successfully!);</script>')
  }
  else{
    res.status(500).send({message:"error please try again"});
}
  
}

exports.delete=(req,res)=>{

    const id=req.params.id;
    const index = data.findIndex(obj => obj.id === parseInt(id));
                  if(index !== -1){
                data.splice(index, 1);

                   for(let i =0 ; i< data.length ; i++){
                    data[i].id = i + 1;
              }
              fs.writeFileSync(file, JSON.stringify(data));
         res.status(200).send('<script>alert(Data Deleted Successfully!);</script>')
                  }
                  
                  else{
                    res.status(500).send({message:"User Data not found"});
                }
                  
}