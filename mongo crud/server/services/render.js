const Register = require("../model/register");
const Newdata = require("../model/dataschema");


exports.signup=(req,res)=>{

    res.render('signup')
}
exports.login=(req,res)=>{

    res.render('login',{loginErr:req.session.loginErr})
   if (req.session.loginErr){
    req.session.destroy();
   }
}
exports.newdata=(req,res)=>{

    const userId=req.params.id
    
    res.render('add-data',{userId})
}

exports.getProData=async(req,res)=>{

    const proId=req.query.id
   const updateData= await Newdata.findOne({_id:proId})
   const userId=updateData.userId;
try{

    if(updateData){

        res.status(201).render('update',{updateData}) ;
    }
    else{
        res.send("no data found")
    }

}
catch{
    res.status(400).send("error on finding data")
}

}

exports.logout=async(req,res)=>{

    req.session.destroy();
    res.redirect('/login')
}