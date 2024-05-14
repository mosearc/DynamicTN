const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
	votes: {type:Number, required:true},
    image: {type: String, default: null },
    //price: { type: Number, require: true } //deve essere un numero ed è necessario
},{timestamps:true});

module.exports = mongoose.model("Post", postSchema);
