// author: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {type: String, required:true},
    slug: {type: String, required:true},
    categoryId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category',required:true},
    brandId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Brand',required:true},
    images: {type: String , required:true},
    modelNo: {type: String, required:true},
    itemId: {type: String, required:true},
    stock: {type: String, required:true},
    rating: {type: String, required:true},
    regularPrice: {type: String, required:true},
    salePrice: {type: String},
    fuelType: {type: String, required:true},
    dryerOptions: {type: String, required:true},
    shortDescription: {type: String, required:true},
    applianceDescription: {type: String, required:true},
    specification: {type: String, required:true},
    deliveryInfo: {type: String, required:true},
    featuresVideo: {type: String, required:true},
},{timestamps: true});

module.exports = mongoose.model('Product',productSchema,'products');