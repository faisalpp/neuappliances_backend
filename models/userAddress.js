const mongoose = require('mongoose')

const userAddressSchema = new mongoose.Schema({
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'User',required:true},
    firstName: {type: String, required:true},
    lastName: {type:String,required:true},
    address: {type:String,required:true},
    city: {type:String,required:true},
    country: {type:String,required:true},
    province: {type:String,required:true},
    phone: {type:String,required:true},
},{timestamps: true});

module.exports = mongoose.model('UserAddress',userAddressSchema,'userAddresses');