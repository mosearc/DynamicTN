const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    post : { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    text: { type: String, required: true },
    //quantity: { type: Number, default: 1 }
    //price: { type: Number, require: true } //deve essere un numero ed è necessario

})

module.exports = mongoose.model('Comment', commentSchema);