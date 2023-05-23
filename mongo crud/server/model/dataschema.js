const mongoose=require('mongoose');

const newdataSchema= new mongoose.Schema({
  userId: {
    type:String,
    required:true,
    unique:true
},
    product: {
      type:String,
      required:true
  },
    category: {
      type:String,
      required:true
  },
    price: {
      type:Number,
      required:true
  }
  });
  const Newdata = mongoose.model('Newdata', newdataSchema);
  
  module.exports=Newdata;