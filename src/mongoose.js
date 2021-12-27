require('dotenv').config();
const mongoose = require('mongoose')
const HitApi = require('../models/hitapi.model');

mongoose.Promise = Promise;

mongoose.connection.on('error',err=>{
    console.log(`MongoDB error:${err}`)
    process.exit(-1)
})

if(process.env.ENV=='development'){
    mongoose.set('debug',true)
}

export  const connectToMongo =  ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true ,
        useUnifiedTopology: true,
       
    })
    return mongoose.connection;
}

export const getMongoConnection = ()=> mongoose.connection;

const models = {HitApi};

export default models;