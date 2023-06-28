const mongoose = require('mongoose')

const billingInformationSchema = new mongoose.Schema({
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'User',required:true},
    firstName: {type: String, required:true},
    lastName: {type:String,required:true},
    address1: {type:String,required:true},
    address2: {type:String,required:true},
    country: {type:String,required:true},
    state: {type:String,required:true},
    city: {type:String,required:true},
    postalCode: {type:String,required:true},
    phone: {type:String,required:true},
},{timestamps: true});

module.exports = mongoose.model('billingInformation',billingInformationSchema,'billingInformation');