const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'missteen';
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.post('/', function(req,res){
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client){
        const db = client.db(dbName);
        db.collection("thi_sinh").find({}).toArray(function(err, result){
            res.send(result);

        })
    })
})
app.get('/', function(req, res){
    res.sendFile("/missU.html", {root: __dirname});
});
app.post('/timkiem', function(req, res){
    var data=req.body
    MongoClient.connect(url, {useNewUrlParser:true}, function(err, client){
        const db=client.db(dbName);
        db.collection("thi_sinh").findOne({ten:data.data},(err,result)=>{
            console.log(result);
            
            res.send(result)
        })
    })
})
app.listen(3000)

