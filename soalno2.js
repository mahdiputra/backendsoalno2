var express = require('express')
var app = express() 


var modb = require('mongodb').MongoClient;
var url = 'mongodb://root:12345@localhost:27017/dataCPU';
 


  var os = require('os')
  var namaCPU = os.hostname() 
  var tipe = os.type(); 
  var platform = os.platform() 
  var rilis = os.release() 
  var ram = os.totalmem() 
  var ramSisa = os.freemem() 
  
 
 
modb.connect(url, (error,data)=>{ 
    console.log('Terhubung ke MongoDB!') })
    app.get('/data',(req,res)=>{ modb.connect(url,(error,data)=>{ 
    var collection = data.collection('data');
     collection.find({}).toArray((error,hasil)=>{
          console.log(hasil); res.send(hasil); 
        })
      }) 
    }) 

app.post('/data',(req,res)=>{ 
    modb.connect(url,(error,data)=>{
         var datas = {namacpu: namaCPU, tipe: tipe, platform: platform , rilis: rilis , ram: ram, ramSisa: ramSisa}; 
         var collection = data.collection('data'); collection.insert(datas, (error,hasil)=>{
              console.log(hasil); 
              res.send(hasil);
             }) 
            }) 
        }) 



app.listen(3210,()=>{ console.log('terhubung @port 3210') })

