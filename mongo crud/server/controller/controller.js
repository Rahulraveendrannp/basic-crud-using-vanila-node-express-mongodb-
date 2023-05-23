
const Register = require("../model/register");
const Newdata = require("../model/dataschema");


exports.productPage=async(req,res)=>{
      
      
    try{
        const userId=req.session.user._id
       if(userId){
       const productDatas  = await Newdata.find({userId: userId});
   
        res.status(201).render('products',{productDatas ,userId})
       }
    
    else{

        res.redirect('/login')
    }
    }
    catch{
        res.status(400).redirect('/login');
    }
    }


exports.registerUser=async(req,res)=>{ 
    try {
        if(req.body.name && req.body.email && req.body.password){
 
            const registerEmployee= new Register({

                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
            })

            const registered = await registerEmployee.save();
            res.status(201).render("login");

        }
        else{
            res.redirect("/login");
        }


    }
    catch(error){
        res.status(400).redirect("/login");
    }
}
exports.userLogin=async(req,res)=>{
  
    try{
     const email=req.body.email;
     const password=req.body.password;

    const userdetails = await Register.findOne({email:email});


    if(!userdetails){
    
        req.session.loginErr="User doesn't exist";
      return  res.redirect("/login")
 
       }
       if(userdetails.password !== password){
    
        req.session.loginErr="incorrect Password";
       return res.redirect("/login")
 
       }else{
        req.session.user=userdetails;
   
    res.redirect('/products');
        
       }      

    }
    catch{
        console.log("error");
        res.status(400).redirect('/login');
    }
    
    
    } ;
 exports.addNewData=async(req,res)=>{
          const Id=req.params.id

        try {
            if(req.body){
    
                const newAddedData= new Newdata({
                    userId:Id,
                    product:req.body.product,
                    category:req.body.category,
                    price:req.body.price,
                })
    
                const dataAdded = await newAddedData.save();
                res.status(201).redirect('/add-data/'+Id);
    
            }
            else{
                res.send("error on adding new data")
            }  
        }
        catch(error){
            res.status(400).send("invalid deatils entered")
        }
           } ;

  exports.deleteData=async(req,res)=>{
            const Id=req.params.id
            const deleteData = await Newdata.findOne({_id:Id});
            try {
                if(deleteData){                    
            const Datadeleted = await Newdata.deleteOne({_id:Id});

                    res.status(201).send('deleted succefully');        
                }
                else{
                    res.send("data not found")
                }        
            }
            catch(error){
                res.status(400).send("error on deleting data")
            }
            
            } ;


 exports.updateData=async(req,res)=>{
                const Id=req.params.id
                const updateData = await Newdata.findOne({_id:Id});
                try {
                    if(updateData){                    
                        await Newdata.updateOne({_id:Id},{$set:{product:req.body.product,category:req.body.category, price:req.body.price
                            }})
                         
                        res.status(201).send('upadated succefully');        
                    }
                    else{
                        res.status(400).redirect('/products')
                    }        
                }
                catch(error){
                    res.status(400).redirect("/login")
                }
                
                } ;            
