const mongoose =  require('mongoose')

const hitApiSchema = new mongoose.Schema({
    api:{
        type:String,
    },
    count: {type:Number, default:0},
},{timestamps:true});

const HitApi = mongoose.model('HitApi',hitApiSchema);

module.exports = HitApi;