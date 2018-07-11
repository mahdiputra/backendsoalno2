// var express = require('express')
// var app = express();
// // var bodyParser = require('body-parser')
// // app.use(bodyParser.json())

// const mysql =require('mysql');
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password : 'mahdipputra',
//     database: 'Plantae'
// })

// var modb = require('mongodb').MongoClient;
// var url = 'mongodb://root:1234@localhost:27017/animalia';


// app.get('/flora/monokotil',(req,res)=>{
//         var querySelect = 'select * from Monocotyledon';
//         db.query(querySelect, (error,hasil)=>{
//         if(error) throw error;
//         console.log(hasil);
//         res.send(hasil)
//     });
// })

// app.get('/flora/dikotil',(req,res)=>{
//     var querySelect = 'select * from Dicotyledon';
//     db.query(querySelect, (error,hasil)=>{
//     if(error) throw error;
//     console.log(hasil);
//     res.send(hasil)
// });
// })

// app.get('/fauna/vertebrata',(req,res)=>{
//     console.log('and1 get ke vertebrata')
//     modb.connect(url,(error,data)=>{
//         var collection = data.collection('vertebrata');
//         collection.find({}).toArray((error,hasil)=>{
//             console.log(hasil)
//             res.send(hasil)
//         })
//     })
// })

// app.get('/fauna/invertebrata',(req,res)=>{
//     console.log('and1 get ke vertebrata')
//     modb.connect(url,(error,data)=>{
//         var collection = data.collection('invertebrata');
//         collection.find({}).toArray((error,hasil)=>{
//             console.log(hasil)
//             res.send(hasil)
//         })
//     })
// })

// app.listen(3210, ()=>{
//     console.log('server aktif @port 3210')
// })

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

