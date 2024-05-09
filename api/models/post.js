const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String, required: true },
    text: String,
    //price: { type: Number, require: true } //deve essere un numero ed è necessario

})

module.exports = mongoose.model('Post', postSchema);