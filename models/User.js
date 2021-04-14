const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        uniqued: true,
        lowercase: true,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    token:{
        type: String,
        trim: true,
        default: null
    }
})

module.exports = mongoose.model('Users', userSchema);