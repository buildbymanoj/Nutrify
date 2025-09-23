const mongoose=require('mongoose')

const trackingSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        required:'foods',
    },
    quantity:{
        type:Number,
        min:1,
        required:true
    }
},{timestamps:true})


const trackingModel=mongoose.model('trackings',trackingSchema)

module.exports=trackingModel;