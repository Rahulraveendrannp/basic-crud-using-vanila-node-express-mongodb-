const express=require("express");
const route=express.Router();
const services= require("../services/render");
const controller= require("../controller/controller");
const session=require("../session/session")


route.get('/signup',services.signup);
route.get('/login',services.login);
route.get('/add-data/:id',session.sessionChecker,services.newdata);
route.get('/update',session.sessionChecker,services.getProData);
route.get('/products',session.sessionChecker,controller.productPage);
route.get('/logout',services.logout);


route.post('/register',controller.registerUser)
route.post('/login',controller.userLogin);
route.post('/add-data/:id',controller.addNewData);
route.put('/update/:id',controller.updateData);
route.delete('/products/:id',controller.deleteData);


module.exports = route