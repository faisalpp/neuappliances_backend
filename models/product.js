// author: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {type: String, required:true},
    slug: {type: String, required:true},
    category: {type: String, required:true},
    color: {type: String, required:true},
    brand: {type: String, required:true},
    fuelType: {type: String, required:true},
    type: {type: String, required:true},
    dryerOption: {type: String, required:true},
    feature: {type: String, required:true},
    bullet1: {type: String, required:true},
    bullet2: {type: String, required:true},
    bullet3: {type: String, required:true},
    bullet4: {type: String, required:true},
    salePrice: {type: String},
    regularPrice: {type: String, required:true},
    images: [{type: String}],
    featuresVideo: {type: String,required:true},
    threeSixty: {type: String,required:true},
    modelNo: {type: String, required:true},
    itemId: {type: String, required:true},
    stock: {type: Number, required:true},
    rating: {type: String, required:true},
    lowerInstallment: {type: String, required:true},
    highInstallment: {type: String, required:true},
    description: {type: String, required:true},
    specification: {type: String, required:true},
    deliveryInfo: {type: String, required:true},
},{timestamps: true});

module.exports = mongoose.model('Product',productSchema,'products');