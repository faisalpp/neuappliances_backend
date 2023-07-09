const mongoose = require('mongoose')

const faqSchema = new mongoose.Schema({
    question: {type: String, required:true,unique:true},
    answer: {type:String,required:true},
    tabId: {type: mongoose.SchemaTypes.ObjectId, ref: 'faqTabs',required:true},
},{timestamps: true});

module.exports = mongoose.model('Faq',faqSchema,'faqs');