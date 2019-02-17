let mongo=require('mongodb');
let mongoose=require('mongoose');
let mqtt=require('mqtt');

var client=mqtt.connect('mqtt://192.168.0.6');
mongoose.connect('mongodb://localhost/junior');
let db=mongoose.connection;
let struct=mongoose.Schema;
let format=new struct({
    id:{
        type:Number
    },
    value:{
        type:Number
    }
},{collection:'hardwaredata'});

let data=mongoose.model('data',format);

client.on('connect',()=>{
    client.subscribe('9640121413',(err)=>{
      if(err)
        console.log(err);
    });
});


client.on('message',(topic,message)=>{

        console.log(message.toString());
        let ultra=parseInt(message.toString());
        let item1={
            id:topic,
            value:ultra
        };
        let insert= new data(item1);
        insert.save();
})
  
