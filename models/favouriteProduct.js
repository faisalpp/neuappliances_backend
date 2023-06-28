const mongoose = require('mongoose')

const favouriteProductSchema = new mongoose.Schema({
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'User',required:true},
    image: {type: String, required:true},
    title: {type:String,required:true},
    regularPrice: {type:String,required:true},
    salePrice: {type:String,required:true},
    discount: {type:String,required:true},
    rating: {type:String,required:true},
},{timestamps: true});

module.exports = mongoose.model('favouriteProduct',favouriteProductSchema,'favouriteProducts');