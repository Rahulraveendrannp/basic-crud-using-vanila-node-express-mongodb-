const express=require("express");
const route=express.Router();
const services=require("../services/render");
const controller=require("../controller/controller")

route.get('/',services.homeRoute);
route.get('/add',services.add);
route.get('/update',services.update);

route.post('/api/user',controller.create)
// route.get('/api/user',controller.find)
// route.get('/api/user/:id',controller.findById)
route.put('/api/user/:id',controller.update)
route.delete('/api/user/:id',controller.delete)  

module.exports = route