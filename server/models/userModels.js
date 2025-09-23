const mongoose = require('mongoose')

const UserSchema =    mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },age:{
        type:Number,
        required: true
    }
})

const userModel=mongoose.model("users",UserSchema)


module.exports = userModel;
