var express=require('express');
var app=express.Router();

var data=require('./db');

app.get('/login',function(req,res){
    res.render('customerlogin');
})

app.get('/register',function(req,res){
    res.render('customerregister');
})


app.post('/register',function(req,res){
    
    var password=req.body.password;
    var conformpassword=req.body.password1;
    if(password!=conformpassword){
        
        res.render('customerregister');
    }
    else{
        data.customerpush(req.body);
        res.render('customerregister');
    }
})

app.post('/login',function(req,res){
    var phonenumber=req.body.username;
    var password=req.body.password;
    data.custmerinsert(phonenumber);
    data.customerlogin(phonenumber,function(err,docs){
        if(err){
            console.log(err);
        }
        else if(docs.password != password){
            console.log("password not matched");
            req.flash('error_msg','invald login')
            res.redirect('/customer/login');
        }
        else{
            data.merchentdetails(function(err,merchentdocs){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(merchentdocs);
                    console.log(docs);
                    data.hardwaredata(docs.phonenumber,function(err,harddata){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(harddata);
                            res.render('customerhome',{customer:docs,merchent:merchentdocs,harddata:harddata});        
                        }
                    })
                    
                }
            })
            
        }
    })
})

app.post('/join',function(req,res){
    var merchentphone=req.body.merchentjoin;
    var customerphone=req.body.customer;
    data.custmerreg(customerphone,merchentphone,function(err,response){
        if(err){
            console.log(err);
        }
        else{
            console.log(response);
            res.render('customerhome');
        }
    });
    
})

app.get('/logout',function(req,res){
    req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/customer/login');
})

module.exports=app;