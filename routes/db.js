var mongodb=require('mongodb');
var mongoose = require('mongoose');

var customer = mongoose.Schema;
var customerconstruct=new customer({
	name: {
		type: String
	},
	apartname: {
		type: String
	},
	address: {
		type: String
	},
	phonenumber: {
		type: String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
	
	
},{collection:'customer'});

var customerdata=mongoose.model('data',customerconstruct);


exports.customerpush=function(details){
    var customerdetails={
        name:details.name,
        apartname:details.apart,
        address:details.address,
        phonenumber:details.phonenumber,
        email:details.email,
        password:details.password
    }
    var customerinsert= new customerdata(customerdetails);
    customerinsert.save();
}

exports.customerlogin=function(phonenumber,cb){
    var query={phonenumber:phonenumber};
	customerdata.findOne(query,cb);
}

exports.customerid=function(id,cb){
    var query={_id:id};
    customerdata.findOne(query,cb);
}




//merchent

var merchent = mongoose.Schema;
var merchentconstruct=new merchent({
	name: {
		type: String
	},
	service: {
		type: String
	},
	address: {
		type: String
	},
	phonenumber: {
		type: String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    price:{
        type:String
    }
},{collection:'merchent'});

var merchentdata=mongoose.model('merchent',merchentconstruct);

exports.merchentpush=function(data){
    var details={
        name:data.name,
        service:data.service,
        address:data.address,
        phonenumber:data.phonenumber,
        email:data.email,
        password:data.password,
        price:data.price
    };
    var insert=new merchentdata(details);
    insert.save();
}

exports.merchentlogin=function(phonenumber,cb){
    var query={phonenumber:phonenumber};
	merchentdata.findOne(query,cb);
}

exports.merchentid=function(id,cb){
    var query={_id:id};
    merchentdata.findOne(query,cb);
}
exports.merchentdetails=function(cb){
    merchentdata.find(cb);
}


//hardware database
let struct=mongoose.Schema;
let format=new struct({
    id:{
        type:Number
    },
    value:{
        type:Number
    }
},{collection:'hardwaredata'});

let harddata=mongoose.model('harddata',format);
exports.hardwaredata=function(id,cb){
    var query={id:id};
    harddata.find(query,cb);
}



//customer merchent relation

var relation=mongoose.Schema;
var realtionformat=new relation({
    customerphone:{
        type:String
    },
    merchentphone:{
        type:String
    }
},{collection:'custmerh'})

var customermerchent=mongoose.model('customermerchent',realtionformat);

exports.custmerreg=function(cp,mp,cb){
    var query1={customerphone:cp};
	var query2={$set:{merchentphone:mp}};
	customermerchent.updateOne(query1,query2,cb);

}

exports.custmerinsert=function(phonenumber){
    var custmerdetails={
        customerphone:phonenumber,
        merchentphone:"qwert"
    }
    var insert=new customermerchent(custmerdetails);
    insert.save();
}
