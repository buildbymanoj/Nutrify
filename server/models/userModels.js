const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
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
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    googleId: {
        type: String,
        required: false
    },
    isGoogleAuth: {
        type: Boolean,
        default: false
    }
})

const userModel = mongoose.model("users", UserSchema)


module.exports = userModel;
