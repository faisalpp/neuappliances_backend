const mongoose = require('mongoose')

const categorySectionSchema = new mongoose.Schema({
    title: {type:String,required:true,unique:true},
    slug: {type:String,required:true,unique:true},
    cardStyle: {type:String},
    type: {type:String},
    categoryId: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category',required:true},
    sectionItemsId: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'SectionItem' }]
},{timestamps: true});

module.exports = mongoose.model('categorySection',categorySectionSchema,'categorySection');