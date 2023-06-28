const mongoose = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({
    token: {type: String, required:true},
    userId:{type: mongoose.SchemaTypes.ObjectId, ref: 'users'},
},{timestamps: true});

module.exports = mongoose.model('RefreshTokne',refreshTokenSchema,'tokens');