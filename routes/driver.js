var express=require('express');
var app=express.Router();

app.get('/login',function(req,res){
    res.render('driverlogin');
})

app.get('/register',function(req,res){
    res.render('driverregister');
})



module.exports=app;