const mongoose = require('mongoose');

const postSchema  = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String, required:true},
    text: {type:String, required:true},
    productImage: {type:String, required:false},
});

module.exports = mongoose.model('Post', postSchema);