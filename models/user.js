const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    phone: {type:String,required:true},
    country: {type:String,required:true},
    isAdmin: {type:String,default: false},
    password: {type:String,required:true},
},{timestamps: true});

module.exports = mongoose.model('User',userSchema,'users');