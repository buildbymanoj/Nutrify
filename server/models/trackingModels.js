const mongoose=require('mongoose')

const trackingSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true

    },
    foodid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'foods',
        required:true
    },
    quantity:{
        type:Number,
        min:1,
        required:true
    },
    details:{
        protein:{type:Number},
        fat:{type:Number},
        fiber:{type:Number},
        carbohydrates:{type:Number},
        calories:{type:Number}
        
    },
   
    eatenDate:{
        type:String,
        default:new Date().toLocaleDateString()
    }
},{timestamps:true})



const trackingModel=mongoose.model('trackings',trackingSchema)

module.exports=trackingModel;