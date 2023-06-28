const mongoose = require('mongoose')

const sectionItemSchema = new mongoose.Schema({
    title: {type:String},
    rating: {type:String,default:null},
    image: {type: String, required:true},
    sectionId: {type: mongoose.SchemaTypes.ObjectId, ref: 'categorySection',required:true},
},{timestamps: true});

module.exports = mongoose.model('SectionItem',sectionItemSchema,'sectionitems');