const express = require('express');
const app = express();
const { connectToMongo } = require('./mongoose');
const data = require('../jobs/hitapi.redisJob')
// import { routerBull } from '../jobs/hitapi.redisJob';

let router = express.Router();

connectToMongo();

app.get('/',(req,res)=>{
    res.send("hello world")
});

app.use(data)



app.get('/api-1',(req,res)=>{
    res.send("you hit api-1")
})

app.get('/api-2',(req,res)=>{
    res.send("you hit api-2")
})

app.listen(3000,()=>console.log(`your server is running at localhost:${3000}`))
