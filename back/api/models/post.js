/*
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },
    
    image: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
*/

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String, required: true },
    text: { type: String, required: true },
    location: { type: String, required: false },
    postImage: { type: String, required: false, default: null },
})

module.exports = mongoose.model('Post', postSchema);
