const Queue = require('bull');
import { model } from 'mongoose';
import models from '../src/mongoose'
const opt = require('../src/redis-server')
const express = require('express')

const { createBullBoard } = require('bull-board')
const { BullAdapter } = require('bull-board/bullAdapter')
const hitApiQueue= new Queue('last-login',opt);

export const {routerBull,setQueues} =createBullBoard([
    new BullAdapter(hitApiQueue)
])


hitApiQueue.process(async (job)=>{
    try{
        const {apiUrl}= job.data;
       
        
        const findApi = await models.HitApi.findOne({api:apiUrl})
        if(!findApi){
            const hitApi = await models.HitApi.insertMany({api:apiUrl})
        }
        
        let result;
        
        
        for(let i =0 ;i<100;i++){
            
            result= await models.HitApi.findOneAndUpdate({api:apiUrl},{
                $inc:{count: 1}
            });
            
        }
        
        hitApiQueue.on('completed',(job,result)=>{
            console.log(job.toJSON())
            console.log(job.finishedOn - job.processedOn)
            
        })
       
        return Promise.resolve({result})
    }catch(err){
        Promise.reject(err);
    }
})



const hitApi = async (req,res,next)=>{
    hitApiQueue.add({apiUrl:req.originalUrl})

    next();
}

module.exports = hitApi;  
