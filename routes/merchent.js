var express=require('express');
var app=express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var db=require('./db');

app.get('/login',function(req,res){
    res.render('merchentlogin');
})

app.get('/register',function(req,res){
    res.render('merchentregister');
})

app.post('/register',function(req,res){
    db.merchentpush(req.body);
    res.render('merchentregister');
})

module.exports=app;